import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mic, Volume2, Sparkles, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EXERCISES = [
    { word: "Apple", hint: "Open your mouth wide like you're taking a big bite!", mouthShape: "wide" },
    { word: "Ball", hint: "Press your lips together, then pop them open!", mouthShape: "round" },
    { word: "Snake", hint: "Smile and make a hissing sound!", mouthShape: "smile" },
    { word: "Fish", hint: "Make a fish face!", mouthShape: "pucker" }
];

const SpeechTherapy = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState("Hi! I'm Buddy. Let's play a word game!");
  const [score, setScore] = useState(0);

  // Simple Speech Synthesis
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      window.speechSynthesis.cancel(); // Stop previous
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.2; 
      utterance.rate = 0.9;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleMicClick = () => {
    setIsListening(true);
    setMessage("Listening...");
    // Simulate listening delay
    setTimeout(() => {
        setIsListening(false);
        const success = Math.random() > 0.3; // Random success for demo
        if (success) {
            setMessage("Great job! You said it perfectly!");
            speak("Great job! You said it perfectly!");
            setScore(prev => prev + 10);
        } else {
            setMessage("Let's try one more time. You can do it!");
            speak("Let's try one more time. You can do it!");
        }
    }, 2000);
  };

  const nextExercise = () => {
      if (currentExercise < EXERCISES.length - 1) {
          setCurrentExercise(prev => prev + 1);
          const nextWord = EXERCISES[currentExercise + 1].word;
          const hint = EXERCISES[currentExercise + 1].hint;
          setMessage(`Can you say "${nextWord}"? ${hint}`);
          speak(`Can you say ${nextWord}? ${hint}`);
      } else {
          setMessage("Wow! You finished all the words! You're a superstar!");
          speak("Wow! You finished all the words! You're a superstar!");
      }
  };

  useEffect(() => {
    // Initial greeting
    const timer = setTimeout(() => {
        speak(message);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Camera access for face movement preview
  useEffect(() => {
    let stream;
    const startCamera = async (retries = 3) => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, frameRate: 15 }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        if (err.name === 'NotReadableError' && retries > 0) {
          setTimeout(() => startCamera(retries - 1), 1000);
        } else {
          console.error("Error accessing camera:", err);
        }
      }
    };
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const currentWord = EXERCISES[currentExercise];

  // Mouth animation variants
  const mouthVariants = {
      idle: { height: 10, width: 40, borderRadius: "0 0 50px 50px" },
      speaking: { 
          height: [10, 40, 10, 30, 10],
          width: [40, 50, 40, 45, 40],
          transition: { repeat: Infinity, duration: 0.5 } 
      },
      wide: { height: 50, width: 50, borderRadius: "50%" }, // Open wide (Apple)
      round: { height: 20, width: 20, borderRadius: "50%" }, // Round (Ball)
      smile: { height: 15, width: 60, borderRadius: "0 0 50px 50px" }, // Smile (Snake)
      pucker: { height: 15, width: 15, borderRadius: "50%" } // Fish
  };

  return (
    <div className="min-h-screen bg-sky-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
       {/* Header */}
       <div className="bg-white dark:bg-slate-900 border-b border-transparent dark:border-slate-800 shadow-sm p-4 flex items-center justify-between transition-colors">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-xl font-bold text-sky-600 dark:text-sky-400 transition-colors">Speech Buddy</h1>
        <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full text-yellow-700 dark:text-yellow-400 font-bold transition-colors">
            <Sparkles size={16} />
            <span>{score} pts</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full">
        
        {/* Avatar Area */}
        <div className="relative mb-12 mt-16 md:mt-24">
            <motion.div 
                animate={{ 
                    y: isSpeaking ? [0, -5, 0] : 0,
                }}
                className="w-64 h-64 bg-white dark:bg-slate-800 rounded-full shadow-xl border-8 border-sky-200 dark:border-sky-900/50 flex items-center justify-center overflow-hidden relative transition-colors"
            >
                {/* Simple CSS Avatar Face */}
                <div className="w-full h-full bg-yellow-100 relative transition-colors">
                    {/* Eyes */}
                    <motion.div 
                        animate={{ scaleY: isSpeaking ? [1, 0.1, 1] : 1 }}
                        transition={{ repeat: isSpeaking ? Infinity : 0, repeatDelay: 2, duration: 0.2 }}
                        className="absolute top-1/3 left-1/4 w-8 h-8 bg-gray-800 rounded-full"
                    >
                         <div className="absolute top-1 right-2 w-3 h-3 bg-white rounded-full"></div>
                    </motion.div>
                    <motion.div 
                         animate={{ scaleY: isSpeaking ? [1, 0.1, 1] : 1 }}
                         transition={{ repeat: isSpeaking ? Infinity : 0, repeatDelay: 2, duration: 0.2 }}
                        className="absolute top-1/3 right-1/4 w-8 h-8 bg-gray-800 rounded-full"
                    >
                         <div className="absolute top-1 right-2 w-3 h-3 bg-white rounded-full"></div>
                    </motion.div>
                    
                    {/* Mouth */}
                    <motion.div 
                        variants={mouthVariants}
                        animate={isSpeaking ? "speaking" : (isListening ? currentWord.mouthShape : "idle")}
                        className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 bg-red-400 border-2 border-red-500"
                        style={{ borderRadius: "0 0 50px 50px" }}
                    ></motion.div>
                    
                    {/* Cheeks */}
                    <div className="absolute top-1/2 left-10 w-8 h-4 bg-pink-200 rounded-full opacity-50"></div>
                    <div className="absolute top-1/2 right-10 w-8 h-4 bg-pink-200 rounded-full opacity-50"></div>
                </div>
            </motion.div>
            
            {/* Speech Bubble */}
            <AnimatePresence mode='wait'>
                <motion.div 
                    key={message}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute -top-32 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 px-6 py-4 rounded-2xl shadow-lg border-2 border-sky-100 dark:border-slate-700 w-72 text-center z-10 transition-colors"
                >
                    <p className="text-gray-700 dark:text-gray-200 font-medium text-lg transition-colors">{message}</p>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-white dark:bg-slate-800 border-b-2 border-r-2 border-sky-100 dark:border-slate-700 transition-colors"></div>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Camera Preview */}
        <div className="w-full max-w-md mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-sky-100 dark:border-slate-800 p-4 transition-colors">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors">Face Movement Preview</p>
            <div className="relative rounded-xl overflow-hidden border border-sky-100 dark:border-slate-700">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-48 object-cover transform -scale-x-100"
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-8 w-full max-w-md">
            <div className="text-center space-y-2">
                <p className="text-gray-500 dark:text-gray-400 uppercase text-xs font-bold tracking-wider transition-colors">Say the word</p>
                <h2 className="text-4xl font-black text-gray-800 dark:text-white tracking-tight transition-colors">{currentWord.word}</h2>
                <p className="text-sky-600 dark:text-sky-400 font-medium transition-colors">{currentWord.hint}</p>
            </div>
            
            <div className="flex items-center gap-6">
                <button 
                    onClick={() => speak(currentWord.word)}
                    className="p-4 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                >
                    <Volume2 size={24} />
                </button>

                <button 
                    onClick={handleMicClick}
                    disabled={isListening}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl ${
                        isListening 
                        ? 'bg-red-500 shadow-red-200 dark:shadow-red-900/20 scale-110' 
                        : 'bg-sky-500 hover:bg-sky-600 shadow-sky-200 dark:shadow-sky-900/20 hover:scale-105'
                    } text-white`}
                >
                    {isListening ? (
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                        >
                            <div className="w-8 h-8 bg-white rounded-sm"></div> 
                        </motion.div>
                    ) : (
                        <Mic size={40} />
                    )}
                </button>

                <button 
                    onClick={nextExercise}
                    className="p-4 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
            
            <p className="text-gray-400 dark:text-gray-500 text-sm transition-colors">
                {isListening ? "Listening..." : "Tap the microphone when you're ready!"}
            </p>
        </div>

      </div>
    </div>
  );
};

export default SpeechTherapy;
