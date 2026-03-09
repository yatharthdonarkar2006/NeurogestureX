import React from 'react';
import { Camera, Mic, Volume2, UserCheck, PlayCircle } from 'lucide-react';

const SessionWidgets = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Character Imitation Card */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg text-white overflow-hidden relative group cursor-pointer">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
        <div className="p-6 relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <UserCheck size={24} className="text-white" />
            </div>
            <span className="bg-green-500 text-xs font-bold px-2 py-1 rounded text-white">NEW EPISODE</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Character Imitation</h3>
          <p className="text-indigo-100 mb-6">Follow the animated character's movements to improve coordination.</p>
          <div className="flex items-center gap-2 text-sm font-medium">
            <PlayCircle size={20} />
            <span>Start Episode 3</span>
          </div>
        </div>
        
        {/* Decorative circle */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* Live Feedback Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Live AI Feedback</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                <Camera size={12} />
                <span>Camera On</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                <Mic size={12} />
                <span>Mic Ready</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg h-32 flex items-center justify-center relative mb-4 overflow-hidden">
             {/* Mock camera feed */}
             <div className="absolute inset-0 flex items-center justify-center">
                 <p className="text-gray-500 text-sm">Camera Preview</p>
             </div>
             
             {/* Overlay UI */}
             <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md rounded p-2 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <Volume2 size={14} className="text-white" />
                 </div>
                 <div>
                     <p className="text-white text-xs font-medium">AI Coach</p>
                     <p className="text-gray-300 text-[10px]">"Good posture! Try lifting your left arm higher."</p>
                 </div>
             </div>
          </div>
        </div>

        <button className="w-full py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Test Camera & Microphone
        </button>
      </div>
    </div>
  );
};

export default SessionWidgets;
