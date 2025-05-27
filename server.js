import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Route Imports
import bookRoutes from './routes/bookRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import duesRoutes from './routes/duesRoutes.js';
import analyticsRoutes from './routes/analytics.js';
import issueRoutes from './routes/issueRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Model Imports
// import Librarian from './models/Librarian.js';
import Book from './models/Book.js';
import Student from './models/Student.js';
import IssueRecord from './models/IssueRecord.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(helmet());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Increase limit to 200 requests per windowMs
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting only to specific routes that need it
// app.use('/api/analytics', limiter);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://yogibaba1207:74488851@ascetic.zjr8s.mongodb.net/?retryWrites=true&w=majority&appName=Ascetic', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};
connectDB();

// Auth Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const librarian = await Librarian.findOne({ username });
    if (!librarian) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, librarian.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: librarian._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.librarian = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Analytics Overview
app.get('/api/analytics/overview', authMiddleware, async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const issuedBooks = await IssueRecord.countDocuments({ returnDate: null });
    const totalStudents = await Student.countDocuments();
    const overdue = await IssueRecord.countDocuments({
      returnDate: null,
      dueDate: { $lt: new Date() },
    });
    res.json({ totalBooks, issuedBooks, totalStudents, overdue });
  } catch (error) {
    res.status(500).json({ message: 'Server error during analytics overview' });
  }
});

// Single Book Fetch Route
app.get('/api/books/:bookId', async (req, res) => {
  try {
    const book = await Book.findOne({ bookId: req.params.bookId });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Use Modular Routes
app.use('/api/books', bookRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/dues', duesRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/auth', authRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
