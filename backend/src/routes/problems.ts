import express from 'express';
import {
  getProblemsByCategory,
  getProblem,
  getCategories,
  searchProblems
} from '../controllers/problemController';
import { optionalAuthenticateToken } from '../middleware/auth';

const router = express.Router();

// Public routes (with optional authentication)
router.get('/categories', optionalAuthenticateToken, getCategories);
router.get('/search', optionalAuthenticateToken, searchProblems);
router.get('/category/:category', optionalAuthenticateToken, getProblemsByCategory);
router.get('/:id', optionalAuthenticateToken, getProblem);

export default router;
