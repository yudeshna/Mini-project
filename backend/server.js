const express = require('express');
const notificationRoutes = require('./routes/notificationRoutes');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const userRoutes = require('./routes/userRoutes');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);
app.use('/uploads', express.static('uploads'));

// Protected test route
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, you are authorized!` });
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'ATS Backend is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});