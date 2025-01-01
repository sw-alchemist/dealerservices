require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import User model
const User = require('./models/User');

// Get current user
app.get('/api/users/me', async (req, res) => {
  try {
    // TODO: Implement authentication middleware to get current user
    const user = await User.findById('USER_ID'); // Replace with actual user ID from auth
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      tutorialCompleted: user.tutorialCompleted
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update tutorial completed status
app.put('/api/users/tutorial-completed', async (req, res) => {
  try {
    // TODO: Implement authentication middleware to get current user
    const user = await User.findById('USER_ID'); // Replace with actual user ID from auth
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.tutorialCompleted = true;
    await user.save();
    
    res.json({ message: 'Tutorial status updated successfully' });
  } catch (error) {
    console.error('Error updating tutorial status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Signup route
app.post('/api/signup', async (req, res) => {
  try {
    const { dealershipName, email, username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email or username already exists' 
      });
    }

    // Create new user
    const user = new User({
      dealershipName,
      email,
      username,
      password
    });

    await user.save();

    res.status(201).json({ 
      message: 'User created successfully',
      user: {
        id: user._id,
        dealershipName: user.dealershipName,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.send('Dealership Management API');
});

// HTTP server setup
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});
