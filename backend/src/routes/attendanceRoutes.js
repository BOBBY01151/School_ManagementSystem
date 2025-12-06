import express from 'express';
import * as attendanceController from '../controllers/attendanceController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', authorize('teacher', 'admin'), attendanceController.markAttendance);
router.post('/bulk', authorize('teacher', 'admin'), attendanceController.markBulkAttendance);

router.get('/student/:studentId', attendanceController.getStudentAttendance);
router.get('/class/:classId', authorize('teacher', 'admin'), attendanceController.getClassAttendance);

export default router;

