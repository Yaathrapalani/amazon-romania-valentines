import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { initDatabase } from './db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';
import paymentRoutes from './routes/payments.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize SQLite database and seed initial catalog
initDatabase();

// Security & Parsing Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// Rate Limiting (configured generously for competitive local testing)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later.' }
});

app.use('/api', apiLimiter);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  return res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'Amazon E-Commerce API',
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', paymentRoutes);

// Centralized Error Handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`[Amazon API] Server listening on http://localhost:${PORT}`);
});

export default app;
