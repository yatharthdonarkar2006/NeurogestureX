import React from 'react';
import { BookOpen, Mic2, Play, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardExtras = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Story-based Rehabilitation */}
      <div 
        onClick={() => navigate('/patient/story-rehab')}
        className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl shadow-sm border border-orange-200 p-6 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group"
      >
        <div className="absolute right-0 top-0 w-32 h-32 bg-orange-200/50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
        
        <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-orange-500">
                <BookOpen size={24} />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">Story-based Rehab</h3>
            <p className="text-gray-700 text-sm mb-4">
                Interactive stories that move forward only when you perform the exercises!
            </p>
            
            <div className="flex items-center gap-2 text-orange-700 font-medium text-sm">
                <Play size={16} fill="currentColor" />
                <span>Start Adventure</span>
            </div>
        </div>
      </div>

      {/* Speech Therapy */}
      <div 
        onClick={() => navigate('/patient/speech-therapy')}
        className="bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl shadow-sm border border-blue-200 p-6 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group"
      >
        <div className="absolute right-0 top-0 w-32 h-32 bg-blue-200/50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
        
        <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-blue-500">
                <Mic2 size={24} />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">Speech Therapy</h3>
            <p className="text-gray-700 text-sm mb-4">
                Fun voice exercises with your animated buddy. Perfect for kids!
            </p>
            
            <div className="flex items-center gap-2 text-blue-700 font-medium text-sm">
                <Star size={16} fill="currentColor" />
                <span>Start Session</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardExtras;
