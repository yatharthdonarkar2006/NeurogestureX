import React from 'react';
import { TrendingUp, Calendar, Award, Flame } from 'lucide-react';

const StatsOverview = ({ stats = {} }) => {
  const {
    streak = 0,
    streakDelta = 0,
    mobilityScore = 0,
    mobilityDelta = 0,
    practiceTime = '0h 0m',
    level = 1,
    badgesEarned = 0,
    totalBadges = 50
  } = stats;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Day Streak Card */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col justify-between transition-colors duration-300">
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-lg">
            <Flame size={20} />
          </div>
          {streakDelta > 0 && (
            <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full">+{streakDelta} today</span>
          )}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{streak}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Day Streak</p>
        </div>
      </div>

      {/* Mobility Score Card */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col justify-between transition-colors duration-300">
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg">
            <TrendingUp size={20} />
          </div>
          {mobilityDelta !== 0 && (
             <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${mobilityDelta > 0 ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10' : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10'}`}>
               {mobilityDelta > 0 ? '+' : ''}{mobilityDelta}%
             </span>
          )}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{mobilityScore}%</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Mobility Score</p>
        </div>
      </div>

      {/* Practice this Week Card */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col justify-between transition-colors duration-300">
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg">
            <Calendar size={20} />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{practiceTime}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Practice this week</p>
        </div>
      </div>

      {/* Badges Earned Card */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col justify-between transition-colors duration-300">
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded-lg">
            <Award size={20} />
          </div>
          {level > 0 && <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-0.5 rounded-full">Level {level}</span>}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{badgesEarned}/{totalBadges}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Badges Earned</p>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
