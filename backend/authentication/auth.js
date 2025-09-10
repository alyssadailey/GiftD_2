const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize'); // for OR queries (checking email or username)
const router = express.Router();
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

//  Register route
router.post('/register', async (req, res) => {
  const { email, username, password, name } = req.body;
  try {
    if (!email || !username || !password || !name) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Check if email OR username already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      username,
      password: hashedPassword,
      name
    });

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  try {
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: 'Please provide username/email and password.' });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful.', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

module.exports = router;