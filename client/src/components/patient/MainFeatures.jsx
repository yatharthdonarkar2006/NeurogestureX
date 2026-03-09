import React from 'react';
import { UserCheck, BookOpen, Mic, PlayCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MainFeatures = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* 1. Character Imitation */}
      <div 
        onClick={() => navigate('/patient/therapy-session')}
        className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg text-white overflow-hidden relative group cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
      >
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
        <div className="p-6 relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="bg-white/20 backdrop-blur-sm w-12 h-12 flex items-center justify-center rounded-xl mb-4">
              <UserCheck size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Character Imitation</h3>
            <p className="text-indigo-100 mb-4 text-sm">Follow the character's moves on screen. AI checks your form!</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold bg-white/20 w-fit px-3 py-1.5 rounded-full backdrop-blur-md">
            <span>Play Game</span>
            <ArrowRight size={16} />
          </div>
        </div>
        {/* Decorative */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* 2. Story-based Rehabilitation */}
      <div 
        onClick={() => navigate('/patient/story-rehab')}
        className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl shadow-lg text-white overflow-hidden relative group cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
      >
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
        <div className="p-6 relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="bg-white/20 backdrop-blur-sm w-12 h-12 flex items-center justify-center rounded-xl mb-4">
              <BookOpen size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Story Adventure</h3>
            <p className="text-orange-100 mb-4 text-sm">Watch the story and perform actions to continue the journey.</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold bg-white/20 w-fit px-3 py-1.5 rounded-full backdrop-blur-md">
            <span>Start Story</span>
            <ArrowRight size={16} />
          </div>
        </div>
        {/* Decorative */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* 3. Speech Therapy */}
      <div 
        onClick={() => navigate('/patient/speech-therapy')}
        className="bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl shadow-lg text-white overflow-hidden relative group cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
      >
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
        <div className="p-6 relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="bg-white/20 backdrop-blur-sm w-12 h-12 flex items-center justify-center rounded-xl mb-4">
              <Mic size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Speech Buddy</h3>
            <p className="text-sky-100 mb-4 text-sm">Interact with Buddy! Speak and watch the face movements.</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold bg-white/20 w-fit px-3 py-1.5 rounded-full backdrop-blur-md">
            <span>Talk Now</span>
            <ArrowRight size={16} />
          </div>
        </div>
        {/* Decorative */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default MainFeatures;