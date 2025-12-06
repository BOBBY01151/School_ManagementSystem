import express from 'express';
import * as dashboardController from '../controllers/dashboardController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/admin', dashboardController.getAdminDashboard);
router.get('/teacher', dashboardController.getTeacherDashboard);
router.get('/student', dashboardController.getStudentDashboard);
router.get('/parent', dashboardController.getParentDashboard);

export default router;

