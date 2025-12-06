import express from 'express';
import * as authController from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes - no authentication required
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected route - requires authentication
router.get('/me', protect, authController.getMe);

export default router;

