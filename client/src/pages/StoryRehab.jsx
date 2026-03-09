import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, RotateCcw, CheckCircle, Pause } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STORY_STEPS = [
  {
    id: 1,
    startTime: 0,
    pauseTime: 10, // Pause at 10s
    text: "We are entering the magical forest. The gate is high up. Reach up to open it!",
    action: "Raise Right Hand",
    check: (landmarks) => {
        const rightWrist = landmarks[16];
        const rightShoulder = landmarks[12];
        return rightWrist && rightShoulder && rightWrist.y < rightShoulder.y - 0.2;
    }
  },
  {
    id: 2,
    startTime: 10,
    pauseTime: 25,
    text: "Look at that beautiful bird! Wave hello to it with your left hand.",
    action: "Wave Left Hand",
    check: (landmarks) => {
        const leftWrist = landmarks[15];
        const leftShoulder = landmarks[11];
        return leftWrist && leftShoulder && leftWrist.y < leftShoulder.y - 0.2;
    }
  },
  {
    id: 3,
    startTime: 25,
    pauseTime: 40,
    text: "A large boulder blocks our path! Push it with both hands!",
    action: "Push Both Hands",
    check: (landmarks) => {
        const leftWrist = landmarks[15];
        const rightWrist = landmarks[16];
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];
        return leftWrist && rightWrist && leftShoulder && rightShoulder &&
               leftWrist.y < leftShoulder.y && rightWrist.y < rightShoulder.y;
    }
  },
  {
    id: 4,
    startTime: 40,
    pauseTime: 60, // End of clip
    text: "We made it! We found the treasure chest. Reach down to grab it!",
    action: "Reach Down",
    check: (landmarks) => {
         const leftWrist = landmarks[15];
         const rightWrist = landmarks[16];
         const leftHip = landmarks[23];
         const rightHip = landmarks[24];
         return leftWrist && rightWrist && leftHip && rightHip &&
                leftWrist.y > leftHip.y && rightWrist.y > rightHip.y;
    }
  }
];

const StoryRehab = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null); // Camera
  const storyVideoRef = useRef(null); // Story Video
  
  const canvasRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [landmarks, setLandmarks] = useState([]);
  const [ws, setWs] = useState(null);
  const [feedback, setFeedback] = useState("Waiting for camera...");
  const [hasStarted, setHasStarted] = useState(false);
  
  const [isWaitingForAction, setIsWaitingForAction] = useState(false);

  function drawLandmarks(landmarksData) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video) return;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections (Full Body Skeleton)
      const connections = [
          [0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8],
          [9, 10], [11, 12], [11, 23], [12, 24], [23, 24],
          [11, 13], [13, 15], [15, 17], [15, 19], [15, 21],
          [12, 14], [14, 16], [16, 18], [16, 20], [16, 22],
          [23, 25], [25, 27], [27, 29], [27, 31], [29, 31],
          [24, 26], [26, 28], [28, 30], [28, 32], [30, 32]
      ];
      
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      
      const points = (landmarksData || []).map(lm => ({
          x: lm.x * canvas.width,
          y: lm.y * canvas.height,
          v: lm.visibility
      }));
      
      connections.forEach(([i, j]) => {
          if (points[i] && points[j] && points[i].v > 0.5 && points[j].v > 0.5) {
              ctx.beginPath();
              ctx.moveTo(points[i].x, points[i].y);
              ctx.lineTo(points[j].x, points[j].y);
              ctx.stroke();
          }
      });
      
      points.forEach((p, index) => {
          if (p.v > 0.5) {
              ctx.beginPath();
              if (index >= 11 && index <= 16) {
                 ctx.fillStyle = '#00ffff';
                 ctx.arc(p.x, p.y, 6, 0, 2 * Math.PI);
              } else if (index >= 23 && index <= 32) {
                 ctx.fillStyle = '#ff00ff';
                 ctx.arc(p.x, p.y, 6, 0, 2 * Math.PI);
              } else {
                 ctx.fillStyle = '#ff0000';
                 ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
              }
              ctx.fill();
              
              if ([11, 12, 13, 14, 15, 16, 23, 24, 25, 26].includes(index)) {
                  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                  ctx.font = '10px monospace';
                  ctx.fillText(`(${Math.round(p.x)},${Math.round(p.y)})`, p.x + 8, p.y);
              }
          }
      });
  }

  // Connection logic
  useEffect(() => {
    const wsUrl = import.meta.env.VITE_AI_WS_URL || 'ws://localhost:8000';
    const websocket = new WebSocket(`${wsUrl}/ws/exercise`);
    
    websocket.onopen = () => {
      console.log('Connected to AI Server');
      setIsConnected(true);
      setFeedback("Connected! Get ready.");
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.landmarks) {
        setLandmarks(data.landmarks);
        drawLandmarks(data.landmarks);
        checkProgress(data.landmarks);
      }
    };

    websocket.onclose = () => {
      console.log('Disconnected');
      setIsConnected(false);
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [currentStep, isWaitingForAction]); 

  // Frame sending loop
  useEffect(() => {
    let interval;
    if (isConnected && videoRef.current) {
      interval = setInterval(() => {
        sendFrame();
      }, 100); // 10 FPS
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  // Start Camera (robust with retry)
  useEffect(() => {
    let stream = null;
    const stopCurrentStream = () => {
      try {
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          stream = null;
        }
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
          videoRef.current.srcObject = null;
        }
      } catch {}
    };

    const startCamera = async (retries = 3, relaxConstraints = false) => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cams = devices.filter(d => d.kind === 'videoinput');
        const preferredId = cams[0]?.deviceId;
        stopCurrentStream();
        stream = await navigator.mediaDevices.getUserMedia(
          relaxConstraints
            ? { video: preferredId ? { deviceId: { exact: preferredId } } : { facingMode: 'user' } }
            : { video: { ...(preferredId ? { deviceId: { exact: preferredId } } : { facingMode: 'user' }), width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 15 } } }
        );
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setFeedback("Camera Ready. Watch the story and follow instructions!");
      } catch (err) {
        console.error("Error accessing camera:", err);
        if ((err.name === 'NotReadableError' || err.name === 'AbortError') && retries > 0) {
          setFeedback(`Camera busy. Retrying... (${retries})`);
          setTimeout(() => startCamera(retries - 1, relaxConstraints), 1000);
        } else if (err.name === 'OverconstrainedError' && !relaxConstraints) {
          setFeedback("Adjusting camera settings...");
          setTimeout(() => startCamera(retries, true), 500);
        } else if (err.name === 'NotAllowedError') {
          setFeedback("Camera permission blocked. Allow access in browser and retry.");
        } else if (err.name === 'NotFoundError') {
          setFeedback("No camera detected. Check device connection and retry.");
        } else {
          setFeedback("Camera Error: " + err.message);
        }
      }
    };
    startCamera();

    return () => {
        stopCurrentStream();
    };
  }, []);

  // Monitor Video Time
  const handleTimeUpdate = () => {
      if (!storyVideoRef.current || isCompleted || !hasStarted) return;
      
      const currentTime = storyVideoRef.current.currentTime;
      const step = STORY_STEPS[currentStep];
      
      if (step && currentTime >= step.pauseTime && !isWaitingForAction) {
          storyVideoRef.current.pause();
          setIsWaitingForAction(true);
      }
  };

  const startAdventure = () => {
      setHasStarted(true);
      if (storyVideoRef.current) {
          storyVideoRef.current.play().catch(e => console.log("Play failed:", e));
      }
  };

  const sendFrame = () => {
    if (!ws || ws.readyState !== WebSocket.OPEN || !videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    ws.send(dataUrl.split(',')[1]); 
  };

  const checkProgress = (currentLandmarks) => {
    if (!isWaitingForAction || isCompleted) return;
    
    const step = STORY_STEPS[currentStep];
    if (step && step.check(currentLandmarks)) {
        // Action detected!
        setIsWaitingForAction(false);
        
        if (currentStep < STORY_STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
            if (storyVideoRef.current) {
                storyVideoRef.current.play();
            }
        } else {
            setIsCompleted(true);
        }
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 shadow-sm p-4 flex items-center justify-between transition-colors duration-300">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-xl font-bold text-orange-600 dark:text-orange-400">Magical Forest Adventure</h1>
        <div className="w-10"></div> 
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row p-6 gap-6 max-w-7xl mx-auto w-full">
        
        {/* Story Video Area */}
        <div className="flex-1 bg-black rounded-2xl shadow-lg overflow-hidden relative border-4 border-orange-100 dark:border-slate-800 group transition-colors duration-300">
            <video 
                ref={storyVideoRef}
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                className="w-full h-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                controls={false}
                muted={false}
                playsInline
            />
            
            {/* Start Overlay for Audio Policy */}
            {!hasStarted && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 transition-colors duration-300">
                    <button 
                        onClick={startAdventure}
                        className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-full text-white font-bold text-xl flex items-center gap-3 transition-colors shadow-lg hover:scale-105 transform duration-200"
                    >
                        <Play size={28} /> Start Adventure
                    </button>
                    <p className="text-orange-200 mt-4 text-sm">Requires sound and camera</p>
                </div>
            )}
            
            {/* Overlay for Action Prompt */}
            <AnimatePresence>
                {isWaitingForAction && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-8 backdrop-blur-sm"
                    >
                         <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-md">
                            {STORY_STEPS[currentStep].action}
                        </h2>
                        <p className="text-xl text-orange-200 mb-8 max-w-lg">
                            {STORY_STEPS[currentStep].text}
                        </p>
                        <div className="w-24 h-24 rounded-full border-4 border-white border-t-orange-500 animate-spin"></div>
                    </motion.div>
                )}
            </AnimatePresence>
            
             {/* Completed Overlay */}
             {isCompleted && (
                <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 flex flex-col items-center justify-center z-20 transition-colors duration-300">
                    <CheckCircle size={64} className="text-green-500 mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white transition-colors">Adventure Complete!</h2>
                    <button 
                        onClick={() => navigate('/patient/dashboard')}
                        className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            )}
        </div>

        {/* Camera Feed Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
            <div className="bg-black rounded-xl overflow-hidden shadow-lg relative aspect-[4/3]">
                <video 
                    ref={videoRef}
                    autoPlay 
                    playsInline 
                    muted 
                    className="absolute inset-0 w-full h-full object-cover transform -scale-x-100" 
                />
                
                <canvas 
                    ref={canvasRef} 
                    className="absolute inset-0 w-full h-full object-cover transform -scale-x-100" 
                />
                
                <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    {isConnected ? 'AI Active' : 'Connecting...'}
                </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
                <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">Current Mission</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                    {isWaitingForAction ? STORY_STEPS[currentStep].text : "Watch the story..."}
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default StoryRehab;
