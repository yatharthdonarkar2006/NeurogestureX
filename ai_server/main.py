import cv2  # type: ignore
import mediapipe as mp  # type: ignore
from mediapipe.tasks import python  # type: ignore
from mediapipe.tasks.python import vision  # type: ignore
import numpy as np  # type: ignore
import base64
from fastapi import FastAPI, WebSocket, WebSocketDisconnect  # type: ignore
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
import json
import os
import asyncio
import functools
import time
import random
from typing import Any
from ai_models import AdaptiveTherapyAI, NormalChildComparison  # type: ignore

app = FastAPI()

# Allow Frontend URLs explicitly for security, fallback to * for local
frontend_url = os.environ.get("FRONTEND_URL", "http://localhost:5173")
origins = [
    frontend_url,
    "http://localhost:3000",
    "http://localhost:5173", 
    "*" # Keep wildcard as ultimate fallback during transition
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI Models
adaptive_ai = AdaptiveTherapyAI()
child_comparator = NormalChildComparison()

# MediaPipe Setup (Tasks API)
model_path = os.path.join(os.path.dirname(__file__), 'pose_landmarker_full.task')

BaseOptions = mp.tasks.BaseOptions
PoseLandmarker = mp.tasks.vision.PoseLandmarker
PoseLandmarkerOptions = mp.tasks.vision.PoseLandmarkerOptions
VisionRunningMode = mp.tasks.vision.RunningMode

# Initialize Landmarker
try:
    options = PoseLandmarkerOptions(
        base_options=BaseOptions(model_asset_path=model_path),
        running_mode=VisionRunningMode.IMAGE,
        num_poses=1,
        min_pose_detection_confidence=0.3,
        min_pose_presence_confidence=0.3,
        min_tracking_confidence=0.3,
        output_segmentation_masks=False
    )
    landmarker = PoseLandmarker.create_from_options(options)
    print("MediaPipe Pose Landmarker initialized successfully.")
except Exception as e:
    print(f"Error initializing MediaPipe: {e}")
    landmarker = None

# Game State Management
class CircleGame:
    def __init__(self):
        self.level = 1
        self.config, _ = adaptive_ai.get_game_config(self.level)
        self.target = self._generate_target()
        self.score = 0
        self.start_time = time.time()
        self.session_duration = 360 # seconds
        self.last_target_time = time.time()
        self.state = "playing" # playing, finished

        self.total_hits = 0
        self.total_attempts = 0
        self.reaction_times = []

    def _generate_target(self):
        # Generate random x, y between 0.2 and 0.8 (keep within reach)
        return {
            "x": int(random.uniform(0.2, 0.8) * 100) / 100,
            "y": int(random.uniform(0.2, 0.8) * 100) / 100,
            "radius": self.config["radius"]
        }

    def update(self, landmarks):
        if self.state == "finished":
            return self.get_state_feedback(f"Time's up! Final Score: {self.score}")

        # Check time
        elapsed = time.time() - self.start_time
        remaining = max(0, self.session_duration - elapsed)
        
        if remaining == 0:
            self.state = "finished"
            # Finalize session stats
            accuracy = self.total_hits / max(1, self.total_attempts)
            avg_rt = sum(self.reaction_times) / max(1, len(self.reaction_times)) if self.reaction_times else 1.0
            
            # Update Neuroplasticity Mapper in Real-time
            adaptive_ai.add_session(
                reaction_time=avg_rt,
                accuracy=accuracy,
                errors=self.total_attempts - self.total_hits,
                attempts=self.total_attempts,
                level=self.level
            )
            
            return self.get_state_feedback(f"Time's up! Final Score: {self.score}")

        # Check collision (Left or Right Wrist)
        hit = False
        threshold = self.config["radius"] # Use adaptive radius
        
        for idx in [15, 16]: # Left and Right Wrist
            if idx < len(landmarks):
                lm = landmarks[idx]
                dist = ((lm['x'] - self.target['x'])**2 + (lm['y'] - self.target['y'])**2)**0.5
                if dist < threshold:
                    hit = True
                    break
        
        feedback_text = "Catch the circle!"
        
        if hit:
            self.score += 1
            self.total_hits += 1
            self.total_attempts += 1
            rt = time.time() - self.last_target_time
            self.reaction_times.append(rt)
            
            # ADAPTIVE UPDATE: Get new config based on performance
            adaptive_ai.add_session(
                reaction_time=sum(self.reaction_times) / len(self.reaction_times),
                accuracy=self.total_hits / self.total_attempts,
                errors=self.total_attempts - self.total_hits,
                attempts=self.total_attempts,
                level=self.level
            )
            self.config, self.level = adaptive_ai.get_game_config(self.level)
            
            self.target = self._generate_target()
            self.last_target_time = time.time()
            feedback_text = f"Nice! Level {self.level}"
                
        elif time.time() - self.last_target_time > self.config["duration"]:
            # Timeout based on adaptive duration
            self.total_attempts += 1 # Count as missed attempt
            
            # ADAPTIVE UPDATE ON MISS
            adaptive_ai.add_session(
                reaction_time=5.0, # Penalty max time
                accuracy=self.total_hits / self.total_attempts,
                errors=self.total_attempts - self.total_hits,
                attempts=self.total_attempts,
                level=self.level
            )
            self.config, self.level = adaptive_ai.get_game_config(self.level)

            self.target = self._generate_target()
            self.last_target_time = time.time()
            feedback_text = "Too slow! Try again."

        return {
            "game_mode": "circle_catch",
            "target": self.target,
            "score": self.score,
            "level": self.level,
            "time_remaining": int(remaining),
            "feedback_text": feedback_text,
            "is_correct": hit,
            "state": self.state
        }

    def get_state_feedback(self, text):
         return {
            "game_mode": "circle_catch",
            "target": self.target,
            "score": self.score,
            "time_remaining": 0,
            "feedback_text": text,
            "is_correct": False,
            "state": self.state
        }

@app.get("/api/analysis")
def get_ai_analysis(age_group: str = "8-10"):
    # 1. Neuroplasticity Analysis (Self-Comparison)
    neuro_score = float(adaptive_ai.get_neuroplasticity_score())
    trend = str(adaptive_ai.get_learning_trend())
    
    # 2. Normal Child Comparison (Benchmark Comparison)
    if adaptive_ai.history:
        latest = adaptive_ai.history[-1]
        latest_metrics = {
            'reaction_time': latest['reaction_time'],
            'accuracy': latest['accuracy']
        }
        comparison = child_comparator.compare(age_group, latest_metrics)
    else:
        comparison = {}
    
    return {
        "neuroplasticity": {
            "score": round(neuro_score, 1),  # type: ignore
            "trend": trend,
            "message": f"Neuroplasticity Score: {round(neuro_score, 1)} - {trend}"  # type: ignore
        },
        "developmental_comparison": comparison
    }

@app.get("/api/neuro-metrics")
def get_neuro_metrics():
    # Provide the neuroplasticity score and trend
    neuro_score = float(adaptive_ai.get_neuroplasticity_score())
    trend = str(adaptive_ai.get_learning_trend())
    
    # Generate some mock curve data matching the frontend's expectations (list of [session_num, score])
    curve_data = []
    if adaptive_ai.history:
        for i, session in enumerate(adaptive_ai.history):
            # Use accuracy as the Y value for the curve
            curve_data.append([i + 1, session.get("accuracy", 0.5) * 100])
        
    return {
        "neuroplasticity_score": round(neuro_score, 1),  # type: ignore
        "trend": trend,
        "curve_data": curve_data,
        "learning_velocity": "+2.4%/session" if adaptive_ai.history else "0%/session"
    }

@app.get("/api/clinical-benchmarks")
def get_clinical_benchmarks(age_group: str = "8-10"):
    # Provide the developmental comparison
    if not adaptive_ai.history:
        return {
            "overall_catch_up": 0,
            "developmental_gap_score": 0,
            "details": {}
        }
        
    latest = adaptive_ai.history[-1]
    latest_metrics = {
        'reaction_time': latest['reaction_time'],
        'accuracy': latest['accuracy']
    }
        
    comparison = child_comparator.compare(age_group, latest_metrics)
    
    return {
        "overall_catch_up": comparison.get("catch_up_percentage", 0),
        "developmental_gap_score": comparison.get("developmental_gap_score", 0),
        "details": comparison.get("details", {})
    }

# ------------------------------
# Speech Therapy Session
# ------------------------------
class SpeechTherapySession:
    def __init__(self):
        self.level = 1
        self.current_word, self.level = adaptive_ai.get_next_word(self.level)
        self.start_time = time.time()
        self.attempts = 0
        self.hits = 0

    def process_input(self, transcript):
        """
        Process user speech transcript and return feedback + next word.
        """
        # Simple string matching for now (Frontend should send lower case)
        transcript = transcript.lower().strip()
        target = self.current_word.lower().strip()
        
        is_correct = target in transcript
        
        self.attempts += 1
        if is_correct:
            self.hits += 1
            reaction_time = time.time() - self.start_time
            
            # ADAPTIVE UPDATE
            adaptive_ai.add_session(
                reaction_time=reaction_time,
                accuracy=self.hits / self.attempts,
                errors=self.attempts - self.hits,
                attempts=self.attempts,
                level=self.level
            )
            
            # Get next word (Adaptive)
            self.current_word, self.level = adaptive_ai.get_next_word(self.level)
            self.start_time = time.time()
            
            return {
                "is_correct": True,
                "feedback": "Great pronunciation!",
                "next_word": self.current_word,
                "level": self.level
            }
        else:
            # If wrong, user tries again or we hint?
            # For adaptive flow, if they fail multiple times, we might want to switch.
            # Here we just give feedback.
            return {
                "is_correct": False,
                "feedback": f"Try again! Say '{self.current_word}'",
                "next_word": self.current_word,
                "level": self.level
            }

@app.websocket("/ws/speech")
async def speech_websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    session = SpeechTherapySession()
    
    # Send initial word
    await websocket.send_text(json.dumps({
        "type": "init",
        "word": session.current_word,
        "level": session.level
    }))
    
    try:
        while True:
            data = await websocket.receive_text()
            # Expecting JSON: {"transcript": "apple"}
            try:
                msg = json.loads(data)
                transcript = msg.get("transcript", "")
                
                result = session.process_input(transcript)
                
                await websocket.send_text(json.dumps({
                    "type": "result",
                    **result
                }))
                
            except json.JSONDecodeError:
                continue
            except Exception as e:
                print(f"Speech Error: {e}")
                break
                
    except WebSocketDisconnect:
        print("Speech Client disconnected")

@app.websocket("/ws/exercise")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    game_session = CircleGame()
    
    # State tracking
    counter = 0
    stage = None
    
    try:
        while True:
            # Receive base64 image from client
            data = await websocket.receive_text()
            
            # Decode base64 image
            try:
                # Format: "data:image/jpeg;base64,....."
                if "," in data:
                    header, encoded = data.split(",", 1)
                else:
                    encoded = data
                    
                img_bytes = base64.b64decode(encoded)
                nparr = np.frombuffer(img_bytes, np.uint8)
                frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                
                if frame is None:
                    continue
                
                # Brightness Check
                avg_brightness = np.mean(frame)
                if avg_brightness < 30:
                     feedback = {
                        "landmarks": [],
                        "feedback_text": "Too Dark! Check lights.",
                        "count": counter,
                        "stage": stage,
                        "is_correct": False
                    }
                     await websocket.send_text(json.dumps(feedback))
                     continue

                # Process with MediaPipe
                if landmarker:
                    # Convert to RGB
                    image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=image_rgb)
                    
                    # Run inference in a separate thread
                    loop = asyncio.get_running_loop()
                    _landmarker = landmarker
                    assert _landmarker is not None
                    detection_result = await loop.run_in_executor(
                        None, 
                        _landmarker.detect,
                        mp_image
                    )
                    
                    feedback: dict[str, Any] = {
                        "landmarks": [],
                        "feedback_text": "No person detected",
                        "count": counter,
                        "stage": stage,
                        "is_correct": False
                    }
                    
                    if detection_result.pose_landmarks:
                        pose_landmarks = detection_result.pose_landmarks[0]
                        
                        # Extract landmarks for frontend drawing
                        landmarks_list = []
                        for lm in pose_landmarks:
                            landmarks_list.append({
                                "x": lm.x,
                                "y": lm.y,
                                "z": lm.z,
                                "visibility": lm.visibility
                            })
                        feedback["landmarks"] = landmarks_list
                        
                        # GAME UPDATE
                        game_res = game_session.update(landmarks_list)
                        
                        feedback["feedback_text"] = game_res["feedback_text"]
                        feedback["count"] = game_res["score"]
                        feedback["stage"] = game_res["state"]
                        feedback["is_correct"] = game_res["is_correct"]
                        feedback["target"] = game_res["target"]
                        feedback["time_remaining"] = game_res["time_remaining"]
                    else:
                        elapsed = time.time() - game_session.start_time
                        remaining = max(0, int(game_session.session_duration - elapsed))
                        feedback["target"] = game_session.target
                        feedback["time_remaining"] = remaining
                else:
                    feedback = {
                        "landmarks": [],
                        "feedback_text": "AI Model Loading Error",
                        "count": counter,
                        "stage": stage,
                        "is_correct": False
                    }
                
                # Send back JSON
                await websocket.send_text(json.dumps(feedback))
                
            except Exception as e:
                print(f"Error processing frame: {e}")
                
    except WebSocketDisconnect:
        print("Client disconnected")

@app.get("/")
def read_root():
    return {"status": "AI Server Running"}

if __name__ == "__main__":
    import uvicorn  # type: ignore
    uvicorn.run(app, host="0.0.0.0", port=8000)
