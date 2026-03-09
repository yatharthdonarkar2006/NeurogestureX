import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalDetails: {
      ageGroup: '',
      gender: '',
      preferredLanguage: '',
      aadhaarNumber: '',
    },
    mentalStatus: {
      cognitiveState: '',
      therapyAssistance: '',
    },
    medicalInfo: {
      primaryCondition: '',
      affectedBodyArea: '',
    },
    therapyGoals: {
      therapyType: '',
      stage: '',
      recoveryGoal: '',
    },
    therapyHistory: {
      hasHistory: false,
      details: {
        therapyType: '',
        duration: '',
        result: '',
      },
    },
    gamification: {
      movementAbility: '',
      painLevel: '',
      attentionSpan: '',
    },
    safetyConsent: {
      cameraMicPermission: false,
      medicalDisclaimer: false,
      emergencyContact: '',
    },
  });

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleNestedChange = (section, nestedSection, field, value) => {
      setFormData((prev) => ({
          ...prev,
          [section]: {
              ...prev[section],
              [nestedSection]: {
                  ...prev[section][nestedSection],
                  [field]: value
              }
          }
      }))
  }

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    if (!formData.personalDetails.gender) {
        alert("Gender is required.");
        setStep(1);
        return;
    }

    try {
      const apiServerUrl = import.meta.env.VITE_API_SERVER_URL || 'http://localhost:5000';
      const response = await fetch(`${apiServerUrl}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        if (user?.role === 'patient') {
            navigate('/patient/dashboard');
        } else {
            navigate('/therapist/dashboard');
        }
      } else {
        console.error('Failed to update profile');
        alert('Failed to save profile. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Personal Details & Aadhaar
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Age Group</label>
                    <select
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border transition-colors"
                        value={formData.personalDetails.ageGroup}
                        onChange={(e) => handleChange('personalDetails', 'ageGroup', e.target.value)}
                    >
                        <option value="">Select Age Group</option>
                        <option value="child">Child (0-12)</option>
                        <option value="teen">Teen (13-19)</option>
                        <option value="adult">Adult (20-64)</option>
                        <option value="elderly">Elderly (65+)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Gender <span className="text-red-500 dark:text-red-400">*</span></label>
                    <select
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border transition-colors"
                        value={formData.personalDetails.gender}
                        onChange={(e) => handleChange('personalDetails', 'gender', e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Preferred Language</label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border transition-colors"
                        value={formData.personalDetails.preferredLanguage}
                        onChange={(e) => handleChange('personalDetails', 'preferredLanguage', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Aadhaar Number <span className="text-red-500 dark:text-red-400">*</span></label>
                    <input
                        type="text"
                        placeholder="12-digit Aadhaar Number"
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border transition-colors"
                        value={formData.personalDetails.aadhaarNumber}
                        onChange={(e) => handleChange('personalDetails', 'aadhaarNumber', e.target.value)}
                        required
                    />
                </div>
            </div>
          </motion.div>
        );
      case 2: // Medical & Mental Status
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">Health & Condition</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Primary Condition</label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border transition-colors"
                        value={formData.medicalInfo.primaryCondition}
                        onChange={(e) => handleChange('medicalInfo', 'primaryCondition', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Affected Body Area</label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border transition-colors"
                        value={formData.medicalInfo.affectedBodyArea}
                        onChange={(e) => handleChange('medicalInfo', 'affectedBodyArea', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Cognitive State</label>
                    <select
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border transition-colors"
                        value={formData.mentalStatus.cognitiveState}
                        onChange={(e) => handleChange('mentalStatus', 'cognitiveState', e.target.value)}
                    >
                        <option value="">Select State</option>
                        <option value="fully_stable">Fully Stable</option>
                        <option value="mild_difficulty">Mild Difficulty</option>
                        <option value="needs_assistance">Needs Assistance</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Therapy Assistance Needed</label>
                    <select
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border transition-colors"
                        value={formData.mentalStatus.therapyAssistance}
                        onChange={(e) => handleChange('mentalStatus', 'therapyAssistance', e.target.value)}
                    >
                        <option value="">Select Option</option>
                        <option value="self">Self (Independent)</option>
                        <option value="with_caregiver">With Caregiver</option>
                        <option value="fully_assisted">Fully Assisted</option>
                    </select>
                </div>
            </div>
          </motion.div>
        );
      case 3: // Goals & History
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">Therapy Goals & History</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Recovery Goal</label>
                    <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border transition-colors"
                        rows="3"
                        value={formData.therapyGoals.recoveryGoal}
                        onChange={(e) => handleChange('therapyGoals', 'recoveryGoal', e.target.value)}
                    />
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 transition-colors"
                        checked={formData.therapyHistory.hasHistory}
                        onChange={(e) => {
                             setFormData(prev => ({
                                 ...prev,
                                 therapyHistory: { ...prev.therapyHistory, hasHistory: e.target.checked }
                             }))
                        }}
                    />
                    <label className="ml-2 block text-sm text-gray-900 dark:text-gray-300 transition-colors">I have previous therapy history</label>
                </div>
                {formData.therapyHistory.hasHistory && (
                    <div className="pl-6 space-y-4 border-l-2 border-gray-200 dark:border-slate-700 transition-colors">
                        <input
                            type="text"
                            placeholder="Type of Therapy"
                            className="block w-full rounded-md border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border transition-colors"
                            value={formData.therapyHistory.details.therapyType}
                            onChange={(e) => handleNestedChange('therapyHistory', 'details', 'therapyType', e.target.value)}
                        />
                         <input
                            type="text"
                            placeholder="Duration"
                            className="block w-full rounded-md border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border transition-colors"
                            value={formData.therapyHistory.details.duration}
                            onChange={(e) => handleNestedChange('therapyHistory', 'details', 'duration', e.target.value)}
                        />
                    </div>
                )}
            </div>
          </motion.div>
        );
      case 4: // Gamification
        return (
            <motion.div variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">Customize Your Experience</h2>
                <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Movement Ability</label>
                        <select
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border transition-colors"
                            value={formData.gamification.movementAbility}
                            onChange={(e) => handleChange('gamification', 'movementAbility', e.target.value)}
                        >
                            <option value="">Select Ability</option>
                            <option value="low">Low (Limited Mobility)</option>
                            <option value="medium">Medium (Can move with effort)</option>
                            <option value="high">High (Full Mobility)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Pain Level (1-10)</label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer transition-colors"
                            value={formData.gamification.painLevel || 1}
                            onChange={(e) => handleChange('gamification', 'painLevel', e.target.value)}
                        />
                        <div className="text-center text-gray-600 dark:text-gray-400 transition-colors">{formData.gamification.painLevel || 1}</div>
                    </div>
                </div>
            </motion.div>
        );
      case 5: // Safety & Review
        return (
            <motion.div variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">Safety & Final Review</h2>
                <div className="space-y-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md transition-colors">
                     <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 transition-colors"
                                checked={formData.safetyConsent.cameraMicPermission}
                                onChange={(e) => {
                                     setFormData(prev => ({
                                         ...prev,
                                         safetyConsent: { ...prev.safetyConsent, cameraMicPermission: e.target.checked }
                                     }))
                                }}
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label className="font-medium text-gray-700 dark:text-gray-300 transition-colors">Camera & Microphone Access</label>
                            <p className="text-gray-500 dark:text-gray-400 transition-colors">Required for AI motion tracking and video consultations.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 transition-colors"
                                checked={formData.safetyConsent.medicalDisclaimer}
                                onChange={(e) => {
                                     setFormData(prev => ({
                                         ...prev,
                                         safetyConsent: { ...prev.safetyConsent, medicalDisclaimer: e.target.checked }
                                     }))
                                }}
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label className="font-medium text-gray-700 dark:text-gray-300 transition-colors">Medical Disclaimer</label>
                            <p className="text-gray-500 dark:text-gray-400 transition-colors">I understand this app is a support tool and not a replacement for professional medical advice.</p>
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Emergency Contact</label>
                        <input
                            type="text"
                            placeholder="Name - Phone Number"
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border transition-colors"
                            value={formData.safetyConsent.emergencyContact}
                            onChange={(e) => handleChange('safetyConsent', 'emergencyContact', e.target.value)}
                        />
                    </div>
                </div>
            </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white transition-colors">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 transition-colors">
          Step {step} of 5
        </p>
        <div className="mt-2 w-full bg-gray-200 dark:bg-slate-800 rounded-full h-2.5 max-w-xs mx-auto transition-colors">
             <div className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-colors" style={{ width: `${(step / 5) * 100}%` }}></div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 transition-colors duration-300">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-slate-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <ChevronLeft className="-ml-1 mr-2 h-5 w-5" />
                Back
              </button>
            )}
            {step < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Next
                <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Complete Setup
                <Check className="ml-2 -mr-1 h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
