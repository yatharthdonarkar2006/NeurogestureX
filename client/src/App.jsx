import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Onboarding from './pages/Onboarding';
import NotFound from './pages/NotFound';
import PatientDashboard from './pages/PatientDashboard';
import TherapistDashboard from './pages/TherapistDashboard';

import TherapistRegistration from './pages/TherapistRegistration';
import TherapySession from './pages/TherapySession';
import StoryRehab from './pages/StoryRehab';
import SpeechTherapy from './pages/SpeechTherapy';

import Pricing from './pages/Pricing';
import Download from './pages/Download';
import Contact from './pages/Contact';
import Help from './pages/Help';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />; // Or unauthorized page
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/download" element={<Download />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route 
                path="/onboarding" 
                element={
                  <ProtectedRoute allowedRoles={['patient', 'therapist']}>
                    <Onboarding />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <PatientDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/therapy-session" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <TherapySession />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/story-rehab" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <StoryRehab />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/speech-therapy" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <SpeechTherapy />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/therapist/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['therapist']}>
                    <TherapistDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/therapist/registration" 
                element={
                  <ProtectedRoute allowedRoles={['therapist']}>
                    <TherapistRegistration />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
