import React, { useState } from 'react';
import { Play, CheckCircle, Circle, Clock, Mic, Video, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TherapyPlan = () => {
  const navigate = useNavigate();
  // Empty state - waiting for AI to assign tasks
  const [tasks] = useState([]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center transition-colors">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white transition-colors">Today's Therapy Plan</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">0 tasks • 0 mins total</p>
        </div>
        <button 
          onClick={() => navigate('/patient/therapy-session')}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Play size={18} fill="currentColor" />
          Start Session
        </button>
      </div>

      <div className="divide-y divide-gray-50 dark:divide-slate-800/50 p-8 text-center transition-colors">
        {tasks.length === 0 ? (
           <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 transition-colors">
             <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3 transition-colors">
                <CheckCircle size={32} />
             </div>
             <p className="text-sm">No tasks assigned yet.</p>
             <p className="text-xs mt-1">Complete an assessment to get your plan.</p>
           </div>
        ) : (
          tasks.map((task, index) => (
            // ... (keep mapping logic if needed later)
            null
          ))
        )}
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border-t border-blue-100 dark:border-blue-900/50 flex items-center gap-3 transition-colors">
        <Award className="text-blue-600 dark:text-blue-400 transition-colors" size={20} />
        <p className="text-sm text-blue-800 dark:text-blue-300 font-medium transition-colors">Complete all tasks to earn the "Daily Warrior" badge!</p>
      </div>
    </div>
  );
};

export default TherapyPlan;
