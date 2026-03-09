import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import WelcomeHeader from '../components/patient/WelcomeHeader';
import StatsOverview from '../components/patient/StatsOverview';
import TeleRehabAI from '../components/patient/TeleRehabAI';
import TherapyPlan from '../components/patient/TherapyPlan';
import RehabSettings from '../components/patient/RehabSettings';
import MainFeatures from '../components/patient/MainFeatures';

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors duration-300"
    >
      <WelcomeHeader user={user} onLogout={handleLogout} />
      
      <StatsOverview stats={{
        streak: 0,
        streakDelta: 0,
        mobilityScore: 0,
        mobilityDelta: 0,
        practiceTime: '0h 0m',
        level: 1,
        badgesEarned: 0,
        totalBadges: 50
      }} />
      
      <TeleRehabAI />

      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 px-1 transition-colors">Rehabilitation Center</h2>
      <MainFeatures />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 space-y-6">
          <TherapyPlan />
        </div>
        
        <div className="space-y-6">
          <RehabSettings />
        </div>
      </div>
    </motion.div>
  );
};

export default PatientDashboard;
