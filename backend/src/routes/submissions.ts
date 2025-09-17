import express from 'express';
import { runCode, createSubmission, listSubmissions, runExamples } from '../controllers/submissionController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Public code execution endpoint (demo only)
router.post('/run', runCode);

// Public example execution endpoint
router.post('/run/:slug', runExamples);

// Authenticated submission endpoints
router.post('/:slug', authenticateToken, createSubmission);
router.get('/:slug', authenticateToken, listSubmissions);

export default router;
