import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Heart, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LiveExercise from '../components/patient/LiveExercise';
import CoachCharacter from '../components/patient/CoachCharacter';

const TherapySession = () => {
  const navigate = useNavigate();
  const timerRef = React.useRef(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [coachState, setCoachState] = useState('idle'); // idle, correct, incorrect, exercise
  const [coachMessage, setCoachMessage] = useState("Let's get started!");
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState(null);
  const [character, setCharacter] = useState('jethalal');
  
  // Handle Start
  const startSession = () => {
      setIsCountingDown(true);
      setCountdown(3);
      setCoachMessage("Get Ready...");
      if (timerRef.current) {
         clearInterval(timerRef.current);
         timerRef.current = null;
      }
      timerRef.current = setInterval(() => {
         setCountdown(prev => {
           if (prev <= 1) {
             clearInterval(timerRef.current);
             timerRef.current = null;
             setIsCountingDown(false);
             setSessionActive(true);
             setCoachMessage("Start your exercise!");
             setCoachState('exercise');
             return 0;
           }
           return prev - 1;
         });
      }, 1000);
  };

  useEffect(() => {
      return () => {
         if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
         }
      };
  }, []);

  // Handle updates from LiveExercise
  const handleFeedbackUpdate = (data) => {
    setCoachMessage(data.feedback_text);
    setCoachState(data.is_correct ? 'correct' : 'exercise');
    setScore(data.count);
    if (data.target) {
        setTarget(data.target);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 lg:p-8 relative">
      {/* Countdown Overlay */}
      <AnimatePresence>
        {countdown > 0 && (
            <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            >
                <motion.div 
                    key={countdown}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 1 }}
                    exit={{ scale: 2, opacity: 0 }}
                    className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                >
                    {countdown}
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
        <button 
          onClick={() => {
            // Save progress before exiting
            if (score > 0) {
                const currentScore = parseInt(localStorage.getItem('dashboard_mobility_score') || '0', 10);
                const currentMins = parseInt(localStorage.getItem('dashboard_practice_mins') || '0', 10);
                
                // Add score (cap at 100 for percentage)
                localStorage.setItem('dashboard_mobility_score', Math.min(100, currentScore + score).toString());
                
                // Add 1 minute of practice time per session played for demo purposes
                localStorage.setItem('dashboard_practice_mins', (currentMins + 1).toString());
            }
            navigate('/patient/dashboard');
          }}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-gray-800 px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={20} />
          <span>Exit Session</span>
        </button>
        <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Arm Extension Therapy
            </h1>
            <p className="text-gray-400 text-sm">Episode 1: The Awakening</p>
        </div>
        <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1 bg-red-900/30 text-red-400 rounded-full border border-red-900/50">
                <Heart size={16} fill="currentColor" />
                <span className="font-mono font-bold">85 BPM</span>
             </div>
        </div>
      </div>

      {/* Main Content - Split Screen */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
        
        {/* Left: Patient Camera */}
        <div className="flex flex-col gap-4">
           <div className="flex items-center justify-between text-gray-300 mb-2 px-1">
                <div className="flex items-center gap-2">
                    <User size={18} />
                    <span className="font-medium">Your Feed</span>
                </div>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">Live Analysis</span>
           </div>
           
          <div className="flex-grow relative">
               <LiveExercise onFeedbackUpdate={handleFeedbackUpdate} isActive={sessionActive} />
               {!sessionActive && !isCountingDown && (
                   <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl z-10 flex-col gap-4">
                       <h3 className="text-white font-bold text-2xl drop-shadow-lg">Choose Your Character</h3>
                       <div className="flex gap-4">
                           <button
                             onClick={() => setCharacter('jethalal')}
                             className={`px-4 py-2 rounded-full border-2 ${character==='jethalal' ? 'bg-yellow-500 text-black border-yellow-300' : 'bg-white/10 text-white border-white/30'}`}
                           >
                             Jethalal
                           </button>
                           <button
                             onClick={() => setCharacter('johnny')}
                             className={`px-4 py-2 rounded-full border-2 ${character==='johnny' ? 'bg-green-500 text-black border-green-300' : 'bg-white/10 text-white border-white/30'}`}
                           >
                             Johnny Lever
                           </button>
                       </div>
                       <button 
                           onClick={startSession}
                           className="group relative flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-xl transition-all hover:scale-105 hover:shadow-blue-500/25 ring-4 ring-white/10"
                       >
                           <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                                <Play size={24} fill="currentColor" className="ml-1" />
                           </div>
                           <span>Start AI Session</span>
                       </button>
                       <p className="text-gray-400 text-sm">Make sure your full body is visible</p>
                   </div>
               )}
           </div>
           
           <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Instructions</h3>
               <p className="text-gray-300">
                   Stand 5-6 feet away. Ensure your upper body is visible. Follow the coach's movements.
               </p>
           </div>
        </div>

        {/* Right: Coach / Game */}
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-gray-300 mb-2 px-1">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🤖</span>
                    <span className="font-medium">Coach {character === 'johnny' ? 'Johnny Lever' : 'Jethalal'}</span>
                </div>
                <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded border border-purple-500/30">
                    AI Guided
                </span>
           </div>

           <div className="flex-grow bg-gradient-to-b from-indigo-900 to-purple-900 rounded-2xl border-4 border-indigo-700/50 relative overflow-hidden shadow-2xl flex items-center justify-center">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute bottom-0 w-full h-1/3 bg-white/5 skew-y-6 transform origin-bottom-left"></div>
                
                {/* Reactive Coach Character */}
                <div className="relative z-10 w-full h-full p-8">
                    <CoachCharacter state={coachState} feedbackText={coachMessage} target={target} character={character} />
                </div>
           </div>
           
           <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700 text-center">
                    <p className="text-xs text-gray-500 uppercase">Score</p>
                    <p className="text-xl font-bold text-yellow-400">{score}</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700 text-center">
                    <p className="text-xs text-gray-500 uppercase">Combo</p>
                    <p className="text-xl font-bold text-purple-400">x4</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700 text-center">
                    <p className="text-xs text-gray-500 uppercase">Time</p>
                    <p className="text-xl font-bold text-blue-400">02:15</p>
                </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default TherapySession;
