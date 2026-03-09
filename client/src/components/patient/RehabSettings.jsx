import React, { useState } from 'react';
import { Activity, MessageCircle, Smile, Zap, Heart, Brain } from 'lucide-react';

const RehabSettings = () => {
  const [selectedType, setSelectedType] = useState('stroke');
  const [coachPersonality, setCoachPersonality] = useState('friendly');

  const rehabTypes = [
    { id: 'stroke', name: 'Stroke Recovery', icon: Brain, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' },
    { id: 'occupational', name: 'Occupational', icon: Activity, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
    { id: 'speech', name: 'Speech Therapy', icon: MessageCircle, color: 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
  ];

  const personalities = [
    { id: 'calm', name: 'Calm & Patient', icon: Heart },
    { id: 'friendly', name: 'Friendly', icon: Smile },
    { id: 'funny', name: 'High Energy', icon: Zap },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 transition-colors duration-300">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 transition-colors">Therapy Settings</h2>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors">Rehab Focus</label>
        <div className="grid grid-cols-1 gap-3">
          {rehabTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                selectedType === type.id 
                  ? `${type.color} border-current ring-1 ring-current` 
                  : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              <type.icon size={20} />
              <span className="font-medium">{type.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors">AI Coach Personality</label>
        <div className="flex gap-2">
          {personalities.map((p) => (
            <button
              key={p.id}
              onClick={() => setCoachPersonality(p.id)}
              className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                coachPersonality === p.id 
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-700 dark:text-indigo-400' 
                  : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              <p.icon size={20} className="mb-2" />
              <span className="text-xs font-medium text-center">{p.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RehabSettings;
