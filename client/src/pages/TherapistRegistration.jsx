import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

import { motion } from 'framer-motion';

const TherapistRegistration = () => {
  const { user, updateUser } = useAuth(); // Assuming login updates the user state
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    mobileNumber: '',
    gender: '',
    dob: '',
    city: '',
    country: '',
    profilePhoto: '', // This would typically be a file upload, using string for URL/Path for now
    therapistRole: 'Therapist',
    governmentId: '',
    aadhaarNumber: '',

    // Step 2: Specialization
    primarySpecialization: '',
    secondarySpecializations: [],
    ageGroupsServed: [],
    therapyMode: 'Online',

    // Step 3: Educational Background
    education: [{
      degree: '',
      university: '',
      yearOfCompletion: '',
      licenseNumber: '',
      certificationFile: ''
    }],

    // Step 4: Experience & Therapy Provided
    experienceYears: 0,
    therapiesProvided: [],
    workExperience: [{
      organizationName: '',
      type: 'Private Practice'
    }],
    sessionFormat: [],
    languagesSpoken: [],
    averageSessionDuration: 60,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, index, field, value) => {
    setFormData(prev => {
      const updatedSection = [...prev[section]];
      updatedSection[index] = { ...updatedSection[index], [field]: value };
      return { ...prev, [section]: updatedSection };
    });
  };
  
  const handleArrayChange = (name, value) => {
     setFormData(prev => {
        const currentArray = prev[name] || [];
        if (currentArray.includes(value)) {
            return { ...prev, [name]: currentArray.filter(item => item !== value) };
        } else {
            return { ...prev, [name]: [...currentArray, value] };
        }
     });
  };

  const handleAddEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', university: '', yearOfCompletion: '', licenseNumber: '', certificationFile: '' }]
    }));
  };

  const handleAddWorkExperience = () => {
      setFormData(prev => ({
          ...prev,
          workExperience: [...prev.workExperience, { organizationName: '', type: 'Private Practice' }]
      }));
  };

  const nextStep = () => {
    if (step === 1) {
        if (!formData.gender) {
            alert("Gender is required.");
            return;
        }
    }
    setStep(prev => prev + 1);
  };
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        // Construct payload to match User model structure
        const payload = {
            therapistProfile: {
                mobileNumber: formData.mobileNumber,
                gender: formData.gender,
                dob: formData.dob,
                city: formData.city,
                country: formData.country,
                profilePhoto: formData.profilePhoto,
                therapistRole: formData.therapistRole,
                governmentId: formData.governmentId,
                primarySpecialization: formData.primarySpecialization,
                secondarySpecializations: formData.secondarySpecializations,
                ageGroupsServed: formData.ageGroupsServed,
                therapyMode: formData.therapyMode,
                education: formData.education,
                experienceYears: Number(formData.experienceYears),
                therapiesProvided: formData.therapiesProvided,
                workExperience: formData.workExperience,
                sessionFormat: formData.sessionFormat,
                languagesSpoken: formData.languagesSpoken, // Assuming comma separated string handled in UI or array
                averageSessionDuration: Number(formData.averageSessionDuration),
                verificationStatus: 'pending' // Default
            }
        };

        const res = await axios.put(`${import.meta.env.VITE_API_URL}/auth/profile`, payload, config);
        
        // Update local user context
        updateUser(res.data.user);
        
        navigate('/therapist/dashboard');
    } catch (error) {
        console.error('Registration failed:', error);
        alert('Failed to submit registration. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="fullName" value={user?.fullName || ''} disabled className="w-full p-2 border border-gray-300 dark:border-slate-700 rounded bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-300 transition-colors" placeholder="Full Name" />
        <input type="email" name="email" value={user?.email || ''} disabled className="w-full p-2 border border-gray-300 dark:border-slate-700 rounded bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-300 transition-colors" placeholder="Email Address" />
        <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded transition-colors" placeholder="Mobile Number" />
        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded transition-colors" required>
            <option value="">Select Gender *</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded transition-colors" placeholder="Date of Birth" />
        <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded transition-colors" placeholder="City" />
        <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded transition-colors" placeholder="Country" />
        <input type="text" name="governmentId" value={formData.governmentId} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded transition-colors" placeholder="Government ID (e.g., PAN)" />
        <input type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded transition-colors" placeholder="Aadhaar Number" />
        <select name="therapistRole" value={formData.therapistRole} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded transition-colors">
            <option value="Therapist">Therapist</option>
            <option value="Counselor">Counselor</option>
            <option value="Psychologist">Psychologist</option>
        </select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors">Specialization</h3>
      <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Primary Specialization</label>
          <select name="primarySpecialization" value={formData.primarySpecialization} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded mt-1 transition-colors">
              <option value="">Select Primary Specialization</option>
              <option value="Anxiety">Anxiety</option>
              <option value="Depression">Depression</option>
              <option value="PTSD">PTSD</option>
              <option value="Stress Management">Stress Management</option>
              <option value="Relationship Counseling">Relationship Counseling</option>
              <option value="Addiction Therapy">Addiction Therapy</option>
              <option value="Child / Adolescent Therapy">Child / Adolescent Therapy</option>
              <option value="Trauma Therapy">Trauma Therapy</option>
          </select>
      </div>

      <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Secondary Specializations</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
              {['Anxiety', 'Depression', 'PTSD', 'Stress Management', 'Relationship Counseling', 'Addiction Therapy', 'Child / Adolescent Therapy', 'Trauma Therapy'].map(spec => (
                  <label key={spec} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 transition-colors">
                      <input 
                          type="checkbox" 
                          checked={formData.secondarySpecializations.includes(spec)}
                          onChange={() => handleArrayChange('secondarySpecializations', spec)}
                          className="rounded border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-indigo-500 dark:focus:ring-indigo-600 transition-colors"
                      />
                      <span>{spec}</span>
                  </label>
              ))}
          </div>
      </div>

      <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Age Groups Served</label>
          <div className="flex space-x-4 mt-1">
              {['Children', 'Teenagers', 'Adults', 'Elderly'].map(age => (
                  <label key={age} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 transition-colors">
                      <input 
                          type="checkbox" 
                          checked={formData.ageGroupsServed.includes(age)}
                          onChange={() => handleArrayChange('ageGroupsServed', age)}
                          className="rounded border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-indigo-500 dark:focus:ring-indigo-600 transition-colors"
                      />
                      <span>{age}</span>
                  </label>
              ))}
          </div>
      </div>

      <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Therapy Mode</label>
          <select name="therapyMode" value={formData.therapyMode} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded mt-1 transition-colors">
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Both">Both</option>
          </select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors">Educational Background</h3>
      {formData.education.map((edu, index) => (
          <div key={index} className="p-4 border border-gray-200 dark:border-slate-700 rounded bg-gray-50 dark:bg-slate-800 space-y-3 relative transition-colors">
              <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400 transition-colors">Qualification {index + 1}</h4>
              <select 
                  value={edu.degree} 
                  onChange={(e) => handleNestedChange('education', index, 'degree', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded transition-colors"
              >
                  <option value="">Select Degree</option>
                  <option value="BA Psychology">BA Psychology</option>
                  <option value="MA Psychology">MA Psychology</option>
                  <option value="M.Phil">M.Phil</option>
                  <option value="PhD">PhD</option>
                  <option value="Diploma">Diploma / Certification</option>
              </select>
              <input 
                  type="text" 
                  value={edu.university}
                  onChange={(e) => handleNestedChange('education', index, 'university', e.target.value)}
                  placeholder="University / Institute Name"
                  className="w-full p-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded transition-colors"
              />
              <input 
                  type="text" 
                  value={edu.yearOfCompletion}
                  onChange={(e) => handleNestedChange('education', index, 'yearOfCompletion', e.target.value)}
                  placeholder="Year of Completion"
                  className="w-full p-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded transition-colors"
              />
               <input 
                  type="text" 
                  value={edu.licenseNumber}
                  onChange={(e) => handleNestedChange('education', index, 'licenseNumber', e.target.value)}
                  placeholder="Professional License Number (if applicable)"
                  className="w-full p-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded transition-colors"
              />
          </div>
      ))}
      <button onClick={handleAddEducation} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium transition-colors">+ Add Another Qualification</button>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors">Experience & Therapy Provided</h3>
      <input 
          type="number" 
          name="experienceYears" 
          value={formData.experienceYears} 
          onChange={handleChange} 
          placeholder="Total Years of Experience" 
          className="w-full p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded transition-colors"
      />

      <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Types of Therapy Provided</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
              {['CBT', 'DBT', 'Psychodynamic Therapy', 'Mindfulness-Based Therapy', 'Family Therapy', 'Couples Therapy'].map(type => (
                  <label key={type} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 transition-colors">
                      <input 
                          type="checkbox" 
                          checked={formData.therapiesProvided.includes(type)}
                          onChange={() => handleArrayChange('therapiesProvided', type)}
                          className="rounded border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-indigo-500 dark:focus:ring-indigo-600 transition-colors"
                      />
                      <span>{type}</span>
                  </label>
              ))}
          </div>
      </div>

      <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Work Experience</label>
          {formData.workExperience.map((exp, index) => (
               <div key={index} className="flex space-x-2 mt-2">
                  <input 
                      type="text" 
                      value={exp.organizationName}
                      onChange={(e) => handleNestedChange('workExperience', index, 'organizationName', e.target.value)}
                      placeholder="Hospital / Clinic / NGO Name"
                      className="flex-1 p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded transition-colors"
                  />
                  <select 
                      value={exp.type}
                      onChange={(e) => handleNestedChange('workExperience', index, 'type', e.target.value)}
                      className="w-1/3 p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded transition-colors"
                  >
                      <option value="Private Practice">Private Practice</option>
                      <option value="Hospital">Hospital</option>
                      <option value="Clinic">Clinic</option>
                      <option value="NGO">NGO</option>
                  </select>
               </div>
          ))}
          <button onClick={handleAddWorkExperience} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium mt-2 transition-colors">+ Add Work Experience</button>
      </div>

      <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Session Format</label>
           <div className="flex space-x-4 mt-1">
               {['One-on-One', 'Group Therapy'].map(fmt => (
                   <label key={fmt} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 transition-colors">
                       <input 
                           type="checkbox" 
                           checked={formData.sessionFormat.includes(fmt)}
                           onChange={() => handleArrayChange('sessionFormat', fmt)}
                           className="rounded border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-indigo-500 dark:focus:ring-indigo-600 transition-colors"
                       />
                       <span>{fmt}</span>
                   </label>
               ))}
           </div>
      </div>
      
       <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Average Session Duration (mins)</label>
           <select name="averageSessionDuration" value={formData.averageSessionDuration} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded mt-1 transition-colors">
               <option value="30">30 Minutes</option>
               <option value="45">45 Minutes</option>
               <option value="60">60 Minutes</option>
           </select>
       </div>
    </div>
  );

  const renderStep5 = () => (
      <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors">Review & Submit</h3>
          <p className="text-gray-600 dark:text-gray-400 transition-colors">Please review your details before submitting.</p>
          
          <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded text-sm space-y-2 text-gray-800 dark:text-gray-200 transition-colors">
              <p><strong>Name:</strong> {user?.fullName}</p>
              <p><strong>Role:</strong> {formData.therapistRole}</p>
              <p><strong>Primary Specialization:</strong> {formData.primarySpecialization}</p>
              <p><strong>Experience:</strong> {formData.experienceYears} Years</p>
              <p><strong>Mode:</strong> {formData.therapyMode}</p>
          </div>

          <label className="flex items-center space-x-2 mt-4 text-gray-700 dark:text-gray-300 transition-colors">
              <input type="checkbox" className="form-checkbox rounded border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-indigo-500 dark:focus:ring-indigo-600 transition-colors" required />
              <span className="text-sm">I accept the Terms & Ethics Policy</span>
          </label>
      </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 p-8 shadow rounded-lg transition-colors duration-300">
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white transition-colors">Therapist Registration</h2>
            <div className="flex justify-center mt-4 space-x-2">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={`h-2 w-12 rounded-full transition-colors ${step >= i ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-gray-200 dark:bg-slate-700'}`}></div>
                ))}
            </div>
        </div>

        {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                {renderStep1()}
            </motion.div>
        )}
        {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                {renderStep2()}
            </motion.div>
        )}
        {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                {renderStep3()}
            </motion.div>
        )}
        {step === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                {renderStep4()}
            </motion.div>
        )}
        {step === 5 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                {renderStep5()}
            </motion.div>
        )}

        <div className="mt-8 flex justify-between">
            {step > 1 && (
                <button onClick={prevStep} className="bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors">
                    Back
                </button>
            )}
            {step < 5 ? (
                <button onClick={nextStep} className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700 dark:hover:bg-indigo-600 ml-auto transition-colors">
                    Next
                </button>
            ) : (
                <button onClick={handleSubmit} disabled={loading} className="bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 dark:hover:bg-green-600 ml-auto transition-colors">
                    {loading ? 'Submitting...' : 'Submit for Verification'}
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default TherapistRegistration;