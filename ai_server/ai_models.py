
import numpy as np  # type: ignore
import pandas as pd  # type: ignore
from sklearn.linear_model import LinearRegression  # type: ignore
from sklearn.ensemble import RandomForestClassifier  # type: ignore
from sklearn.preprocessing import LabelEncoder  # type: ignore
from datetime import datetime

class AdaptiveTherapyAI: 
    def __init__(self): 
        self.history = [] 
        self.model = RandomForestClassifier( 
            n_estimators=100, 
            random_state=42 
        ) 
        self.encoder = LabelEncoder() 
        self.is_trained = False 
        self.last_state = "Establishing Baseline"

        # Word Banks for Speech Therapy
        self.word_banks = {
            1: ["ma", "pa", "ba", "da", "ta"],
            2: ["mama", "dada", "water", "food", "ball"],
            3: ["apple", "banana", "spoon", "happy", "chair"],
            4: ["spaghetti", "elephant", "computer", "umbrella", "yesterday"],
            5: ["extraordinary", "communication", "imagination", "opportunity", "development"]
        }

    # ------------------------------- 
    # 1. Add session data 
    # ------------------------------- 
    def add_session(self, reaction_time, accuracy, errors, attempts, level=1): 
        session = { 
            "reaction_time": reaction_time, 
            "accuracy": accuracy, 
            "errors": errors, 
            "attempts": attempts, 
            "level": level,
            "timestamp": datetime.now().timestamp()
        }
        self.history.append(session)
        # Train immediately if enough data, or just track state
        if len(self.history) >= 5:
            self.train()
        
        # Update last state
        self.last_state = self.label_state(session)

    # ------------------------------- 
    # 2. Label learning state 
    # ------------------------------- 
    def label_state(self, session): 
        if session["accuracy"] > 0.85 and session["errors"] <= 1: 
            return "MASTERED" 
        elif session["accuracy"] > 0.6: 
            return "IMPROVING" 
        else: 
            return "STRUGGLING" 

    # -------------------------------
    # Get Next Word (Adaptive Speech)
    # -------------------------------
    def get_next_word(self, current_level):
        """
        Returns a word from the appropriate difficulty level based on the last state.
        """
        state = self.last_state
        next_level = current_level

        if state == "MASTERED":
            next_level = min(5, current_level + 1)
        elif state == "STRUGGLING":
            next_level = max(1, current_level - 1)
        
        # If improving, keep same level to reinforce
        
        words = self.word_banks.get(next_level, self.word_banks[1])
        return np.random.choice(words), next_level

    # -------------------------------
    # Get Next Game Config (Adaptive Motor)
    # -------------------------------
    def get_game_config(self, current_level):
        """
        Returns game configuration (target size, speed) based on difficulty level.
        """
        state = self.last_state
        next_level = current_level

        if state == "MASTERED":
            next_level = min(5, current_level + 1)
        elif state == "STRUGGLING":
            next_level = max(1, current_level - 1)

        # Configs for levels 1-5
        # Radius decreases, Time limit decreases
        configs = {
            1: {"radius": 0.15, "duration": 5.0}, # Large, Slow
            2: {"radius": 0.12, "duration": 4.0},
            3: {"radius": 0.10, "duration": 3.0}, # Medium
            4: {"radius": 0.08, "duration": 2.5},
            5: {"radius": 0.06, "duration": 2.0}  # Small, Fast
        }
        
        return configs.get(next_level, configs[1]), next_level
 

    # ------------------------------- 
    # 3. Prepare training data 
    # ------------------------------- 
    def prepare_data(self): 
        X, y = [], [] 

        for s in self.history: 
            features = [ 
                s["reaction_time"], 
                s["accuracy"], 
                s["errors"], 
                s["attempts"], 
                s["level"] 
            ] 
            X.append(features) 
            y.append(self.label_state(s)) 

        y_encoded = self.encoder.fit_transform(y) 
        return np.array(X), y_encoded 

    # ------------------------------- 
    # 4. Train ML model 
    # ------------------------------- 
    def train(self): 
        if len(self.history) < 5: 
            return False 

        X, y = self.prepare_data() 
        self.model.fit(X, y) 
        self.is_trained = True 
        return True 

    # ------------------------------- 
    # 5. Predict learning state 
    # ------------------------------- 
    def predict_state(self, session): 
        if not self.is_trained: 
            # Fallback to simple labeling if not enough data for RF
            return self.label_state(session), 100.0

        features = [[ 
            session["reaction_time"], 
            session["accuracy"], 
            session["errors"], 
            session["attempts"], 
            session["level"] 
        ]] 

        probs = self.model.predict_proba(features)[0] 
        pred = self.model.predict(features)[0] 
        
        # Handle case where encoder might not have seen all classes if training set was small
        try:
            state = self.encoder.inverse_transform([pred])[0] 
        except:
             state = self.label_state(session)

        confidence = round(max(probs) * 100, 2) 

        return state, confidence 

    # ------------------------------- 
    # 6. Adaptive decision logic 
    # ------------------------------- 
    def recommend_next_action(self, state, current_level=1): 
        if state == "MASTERED": 
            return "Increase Difficulty", current_level + 1 
        elif state == "STRUGGLING": 
            return "Simplify Task", max(1, current_level - 1) 
        else: 
            return "Maintain Difficulty", current_level 
            
    # -------------------------------
    # Compatibility Methods for Frontend
    # -------------------------------
    def get_neuroplasticity_score(self):
        """
        Maps the current state/performance to a 0-100 score for dashboard compatibility.
        """
        if not self.history:
            return 0.0
            
        latest = self.history[-1]
        state = self.last_state
        
        # Base score from performance
        base_score = (latest['accuracy'] * 50) + (max(0.0, 1.0 - latest['reaction_time']) * 50)
        
        # Adjust based on state
        if state == "MASTERED":
            return min(100, base_score + 10)
        elif state == "STRUGGLING":
            return max(0, base_score - 10)
            
        return min(100, max(0, base_score))

    def get_learning_trend(self):
        return self.last_state.replace('_', ' ').title()

class NeuroplasticityMapper:
    # Deprecated - Kept for reference or fallback, but logic moved to AdaptiveTherapyAI
    pass

class NormalChildComparison:
    def __init__(self):
        # Benchmarks for different age groups (Simulated)
        self.benchmarks = {
            '5-7': {'reaction_time': 0.8, 'accuracy': 0.75},
            '8-10': {'reaction_time': 0.6, 'accuracy': 0.85},
            '11-13': {'reaction_time': 0.5, 'accuracy': 0.90}
        }
        
    def compare(self, age_group, patient_metrics):
        benchmark = self.benchmarks.get(age_group, self.benchmarks['8-10'])
        
        rt_gap = patient_metrics['reaction_time'] - benchmark['reaction_time']
        acc_gap = benchmark['accuracy'] - patient_metrics['accuracy']
        
        # Developmental Gap Score (Lower is better, 0 means caught up)
        gap_score = (max(0.0, rt_gap) * 50) + (max(0.0, acc_gap) * 50)
        
        # Catch-up Percentage
        catch_up = max(0.0, 100.0 - (gap_score * 2))
        
        rt_status = "Needs Improvement" if rt_gap > 0 else "Within Norm"
        rt_catch_up = max(0.0, 100.0 - (max(0.0, rt_gap) * 100))
        
        acc_status = "Needs Improvement" if acc_gap > 0 else "Within Norm"
        acc_catch_up = max(0.0, 100.0 - (max(0.0, acc_gap) * 100))
        
        return {
            'developmental_gap_score': round(gap_score, 2),  # type: ignore
            'catch_up_percentage': round(catch_up, 1),  # type: ignore
            'skill_deficit': 'Reaction Speed' if rt_gap > acc_gap else 'Precision',
            'details': {
                'reaction_time': {
                    'status': rt_status,
                    'catch_up_percentage': round(rt_catch_up, 1)  # type: ignore
                },
                'accuracy': {
                    'status': acc_status,
                    'catch_up_percentage': round(acc_catch_up, 1)  # type: ignore
                }
            }
        }
