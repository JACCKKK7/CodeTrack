import express from 'express';
import {
  register,
  login,
  getMe,
  registerValidation,
  loginValidation
} from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Protected routes
router.get('/me', authenticateToken, getMe);

export default router;
