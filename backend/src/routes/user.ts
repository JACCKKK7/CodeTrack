import express from 'express';
import {
  getUserProfile,
  markProblemSolved,
  unmarkProblemSolved,
  toggleProblemStar,
  getSolvedProblems,
  getStarredProblems
} from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All user routes require authentication
router.use(authenticateToken);

// User profile routes
router.get('/profile', getUserProfile);
router.get('/solved', getSolvedProblems);
router.get('/starred', getStarredProblems);

// Problem interaction routes
router.post('/solve/:problemId', markProblemSolved);
router.delete('/solve/:problemId', unmarkProblemSolved);
router.post('/star/:problemId', toggleProblemStar);

export default router;
