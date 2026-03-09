const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    process.env.FRONTEND_URL, 
    'http://localhost:5173', 
    'http://localhost:3000'
  ].filter(Boolean)
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // Exit process on DB connection error so it's obvious to the user/supervisor
    // instead of hanging and timing out on requests
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Tele-Rehab API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
