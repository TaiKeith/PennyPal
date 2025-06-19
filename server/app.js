import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

// Import routes

// Import middlewares

// Load environment variables
dotenv.config();

// Initialize express app
const app = express()

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handling Middleware

export default app;
