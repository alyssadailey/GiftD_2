require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./auth'); // make sure you have auth.js with routes
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});