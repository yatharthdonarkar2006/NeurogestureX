import React from 'react';
import { Bell, Crown, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const WelcomeHeader = ({ user, onLogout }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 mb-6 transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 border-2 border-white dark:border-slate-800 shadow-md transition-colors">
              <User size={32} />
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full transition-colors"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
              Welcome back, {user?.fullName?.split(' ')[0] || 'Patient'}! 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400 transition-colors">Let's continue your recovery journey.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center px-3 py-1 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium border border-amber-200 dark:border-amber-500/30 transition-colors">
            <Crown size={14} className="mr-1.5" />
            <span>Free Plan</span>
            <button className="ml-2 text-amber-800 dark:text-amber-300 hover:underline text-xs font-bold transition-colors">UPGRADE</button>
          </div>
          
          <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 transition-colors"></span>
          </button>

          <div className="h-8 w-px bg-gray-200 dark:bg-slate-700 mx-1 transition-colors"></div>

          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeHeader;
