const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['patient', 'therapist'],
    required: true,
  },
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
  // Step 2: Personal Details
  personalDetails: {
    ageGroup: { type: String, enum: ['child', 'teen', 'adult', 'elderly'] },
    gender: { 
      type: String, 
      required: function() { return this.isProfileComplete && this.role === 'patient'; } 
    }, // Made mandatory conditionally
    aadhaarNumber: { type: String }, // Added Aadhaar
    preferredLanguage: { type: String },
  },
  // Step 3: Mental & Assistance Status
  mentalStatus: {
    cognitiveState: { type: String, enum: ['fully_stable', 'mild_difficulty', 'needs_assistance'] },
    therapyAssistance: { type: String, enum: ['self', 'with_caregiver', 'fully_assisted'] },
  },
  // Step 4: Medical & Rehab Information
  medicalInfo: {
    primaryCondition: { type: String },
    affectedBodyArea: { type: String }, // Could be array if multiple
  },
  // Step 5: Therapy Needs & Goals
  therapyGoals: {
    therapyType: { type: String },
    stage: { type: String },
    recoveryGoal: { type: String },
  },
  // Step 6: Previous Therapy History
  therapyHistory: {
    hasHistory: { type: Boolean },
    details: {
      therapyType: String,
      duration: String,
      result: String,
    },
  },
  // Step 7: Gamification & Comfort Inputs
  gamification: {
    movementAbility: { type: String },
    painLevel: { type: String },
    attentionSpan: { type: String },
  },
  // Step 8: Safety & Consent
  safetyConsent: {
    cameraMicPermission: { type: Boolean },
    medicalDisclaimer: { type: Boolean },
    emergencyContact: { type: String },
  },
  
  // Therapist Specific Fields
  therapistProfile: {
    // Step 1: Basic Information
    mobileNumber: { type: String },
    gender: { 
      type: String, 
      required: function() { return this.isProfileComplete && this.role === 'therapist'; } 
    },
    aadhaarNumber: { 
      type: String, 
      required: function() { return this.isProfileComplete && this.role === 'therapist'; } 
    },
    dob: { type: Date },
    city: { type: String },
    country: { type: String },
    profilePhoto: { type: String },
    therapistRole: { type: String, enum: ['Therapist', 'Counselor', 'Psychologist'] },
    governmentId: { type: String }, // URL or path to uploaded file

    // Step 2: Specialization
    primarySpecialization: { type: String },
    secondarySpecializations: [{ type: String }],
    ageGroupsServed: [{ type: String }],
    therapyMode: { type: String, enum: ['Online', 'Offline', 'Both'] },

    // Step 3: Educational Background
    education: [{
      degree: { type: String },
      university: { type: String },
      yearOfCompletion: { type: String },
      licenseNumber: { type: String },
      certificationFile: { type: String } // URL or path
    }],

    // Step 4: Experience & Therapy Provided
    experienceYears: { type: Number },
    therapiesProvided: [{ type: String }],
    workExperience: [{
      organizationName: { type: String },
      type: { type: String } // Hospital, Clinic, NGO, Private Practice
    }],
    sessionFormat: [{ type: String }], // One-on-One, Group
    languagesSpoken: [{ type: String }],
    averageSessionDuration: { type: Number }, // in minutes

    // Platform Specifics
    verificationStatus: { type: String, enum: ['verified', 'pending', 'rejected'], default: 'pending' },
    availabilityStatus: { type: String, enum: ['online', 'offline'], default: 'offline' },
    bio: { type: String },
    earnings: {
      total: { type: Number, default: 0 },
      pending: { type: Number, default: 0 },
      paid: { type: Number, default: 0 },
      history: [{
        date: { type: Date },
        amount: { type: Number },
        status: { type: String }
      }]
    },
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
      feedback: [{
        patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number },
        comment: { type: String },
        date: { type: Date, default: Date.now }
      }]
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
