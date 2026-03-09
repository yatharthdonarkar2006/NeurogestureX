import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BasicInfo from '../components/therapist/BasicInfo';
import ActivityDashboard from '../components/therapist/ActivityDashboard';
import PatientData from '../components/therapist/PatientData';
import PayoutSection from '../components/therapist/PayoutSection';
import FeedbackSection from '../components/therapist/FeedbackSection';
import OutcomeInsights from '../components/therapist/OutcomeInsights';
import RemindersSection from '../components/therapist/RemindersSection';
import VerificationSection from '../components/therapist/VerificationSection';
import SecureNotes from '../components/therapist/SecureNotes';
import GrowthInsights from '../components/therapist/GrowthInsights';

const TherapistDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">Therapist Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition-colors shadow-sm"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
      
      {/* 1. Basic Information */}
      <BasicInfo user={user} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
            {/* 2. Activity Dashboard */}
            <ActivityDashboard />

            {/* 3. Patient Data */}
            <PatientData />

            {/* 6. AI Therapy Outcome Insights */}
            <OutcomeInsights />

             {/* 4. Payout & Earnings */}
             <PayoutSection />
        </div>

        {/* Right Column (Sidebar/Secondary) */}
        <div className="space-y-6">
            {/* 8. Smart Reminders */}
            <RemindersSection />

            {/* 9. Verification */}
            <VerificationSection user={user} />

            {/* 5. Feedback */}
            <FeedbackSection />

            {/* 11. Growth Insights */}
            <GrowthInsights />

            {/* 10. Secure Notes */}
            <SecureNotes />
        </div>
      </div>
    </motion.div>
  );
};

export default TherapistDashboard;
