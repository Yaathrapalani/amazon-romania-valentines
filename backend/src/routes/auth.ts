import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import { authMiddleware, AuthRequest, JWT_SECRET } from '../middleware/auth.js';

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

router.post('/register', (req, res, next) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }

    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);
    const id = 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);

    db.prepare('INSERT INTO users (id, email, password_hash, name) VALUES (?, ?, ?, ?)').run(
      id,
      email,
      password_hash,
      name
    );

    const token = jwt.sign({ id, email, name }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      user: { id, email, name },
      token,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/login', (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const isValid = bcrypt.compareSync(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
      token,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (_req, res) => {
  res.clearCookie('token');
  return res.json({ success: true, message: 'Logged out successfully' });
});

router.get('/me', authMiddleware, (req: AuthRequest, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
});

export default router;
