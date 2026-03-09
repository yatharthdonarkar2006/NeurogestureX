import React from 'react';
import { motion } from 'framer-motion';

const CoachCharacter = ({ state = 'idle', feedbackText = "Ready?", target = null, character = 'jethalal' }) => {
  // Ensure target has valid coordinates, otherwise fallback to default rest position
  const safeTarget = target && typeof target.x === 'number' && typeof target.y === 'number' ? target : null;
  
  const handX = safeTarget ? safeTarget.x * 100 : 80;
  const handY = safeTarget ? safeTarget.y * 100 : 50;
  const bodyFill = character === 'johnny' ? '#4ADE80' : '#FF9933';
  const accentFill = state === 'correct' ? '#22C55E' : (character === 'johnny' ? '#10B981' : 'yellow');
  const label = character === 'johnny' ? 'Johnny Lever Says' : 'Jethalal Says';

  return (
    <div className="relative flex flex-col items-center justify-center h-full">
        <div className="w-64 h-80 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
                <path d="M 30 60 L 30 100 L 70 100 L 70 60 Q 50 50 30 60" fill={bodyFill} stroke="black" strokeWidth="1" />
                <path d="M 35 60 L 35 100" stroke="black" strokeWidth="0.2" opacity="0.3" />
                <path d="M 45 60 L 45 100" stroke="black" strokeWidth="0.2" opacity="0.3" />
                <path d="M 55 60 L 55 100" stroke="black" strokeWidth="0.2" opacity="0.3" />
                <path d="M 65 60 L 65 100" stroke="black" strokeWidth="0.2" opacity="0.3" />
                <circle cx="40" cy="80" r="2" fill={accentFill} opacity="0.5" />
                <circle cx="60" cy="70" r="2" fill={accentFill} opacity="0.5" />
                <circle cx="50" cy="90" r="2" fill={accentFill} opacity="0.5" />

                <circle cx="50" cy="35" r="14" fill="#F5D0A9" stroke="black" strokeWidth="1" />
                {character === 'johnny' ? (
                  <>
                    <path d="M 36 28 Q 42 20 50 22 Q 58 20 64 28" fill="black" />
                    <path d="M 42 45 Q 50 47 58 45" stroke="black" strokeWidth="2" fill="transparent" />
                  </>
                ) : (
                  <>
                    <path d="M 36 30 Q 34 20 45 18 Q 60 15 64 30 Z" fill="black" />
                    <path d="M 43 42 Q 50 38 57 42 L 57 45 Q 50 42 43 45 Z" fill="black" />
                  </>
                )}
                <circle cx="44" cy="34" r="2.5" fill="white" stroke="black" strokeWidth="0.5"/>
                <circle cx="44" cy="34" r="1" fill="black" />
                <circle cx="56" cy="34" r="2.5" fill="white" stroke="black" strokeWidth="0.5"/>
                <circle cx="56" cy="34" r="1" fill="black" />
                <path d="M 45 52 Q 50 55 55 52" stroke="black" strokeWidth="1" fill="transparent" />

                <path d="M 30 62 Q 20 70 25 80" stroke="#F5D0A9" strokeWidth="5" strokeLinecap="round" fill="transparent"/>
                <motion.line 
                    x1="70" y1="62" 
                    animate={{ x2: handX, y2: handY }}
                    stroke="#F5D0A9" 
                    strokeWidth="5" 
                    strokeLinecap="round" 
                />
                <motion.circle 
                    animate={{ cx: handX, cy: handY }} 
                    r="6" 
                    fill="#F5D0A9" 
                    stroke="black" 
                    strokeWidth="1" 
                />
            </svg>
            {target && (
                <motion.div 
                    animate={{ left: `${target.x * 100}%`, top: `${target.y * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute w-8 h-8 rounded-full border-2 border-dashed border-white/50 bg-white/10 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                    <div className="absolute inset-0 animate-ping rounded-full bg-white/20"></div>
                </motion.div>
            )}
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={feedbackText}
            className="mt-2 bg-white px-4 py-3 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-xs text-center relative z-20"
        >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black"></div>
            <div className="absolute -top-[9px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                {label}
            </p>
            <p className="text-lg text-black font-bold font-comic">"{feedbackText}"</p>
        </motion.div>
    </div>
  );
};

export default CoachCharacter;
