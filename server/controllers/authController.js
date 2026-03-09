const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role // 'patient' or 'therapist'
    });

    await newUser.save();

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET missing during register');
      return res.status(500).json({ message: 'Server misconfiguration' });
    }

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email, role: newUser.role, isProfileComplete: newUser.isProfileComplete } });
  } catch (error) {
    console.error('Register handler error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.password || typeof user.password !== 'string') {
      console.warn('Login warning: user has no valid password hash', { userId: user._id, email });
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (cmpErr) {
      console.error('bcrypt.compare failed:', cmpErr);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET missing during login');
      return res.status(500).json({ message: 'Server misconfiguration' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user._id, email: user.email, role: user.role, isProfileComplete: user.isProfileComplete } });
  } catch (error) {
    console.error('Login handler error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const updates = req.body;

    // Handle therapist-specific updates
    if (updates.therapistProfile) {
      const currentUser = await User.findById(userId);
      if (currentUser && currentUser.therapistProfile) {
          updates.therapistProfile = { ...currentUser.therapistProfile.toObject(), ...updates.therapistProfile };
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        ...updates,
        isProfileComplete: true 
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('UpdateProfile handler error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, updateProfile };
