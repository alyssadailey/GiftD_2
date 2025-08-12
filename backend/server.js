require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); 
const authRoutes = require('./authentication/auth');
const authenticateToken = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Protected routes example:
// const protectedRoutes = require('./routes/protected'); // your protected routes file

// app.use('/api/protected', authenticateToken, protectedRoutes);

//  Syncs DB and start server
sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Connected to DB and synced models.');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ Database connection failed:', err);
});