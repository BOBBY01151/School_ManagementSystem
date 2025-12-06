import express from 'express';
import * as marksController from '../controllers/marksController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', authorize('teacher', 'admin'), marksController.enterMarks);
router.post('/bulk', authorize('teacher', 'admin'), marksController.enterBulkMarks);

router.get('/student/:studentId', marksController.getStudentMarks);
router.get('/class/:classId/subject/:subjectId', authorize('teacher', 'admin'), marksController.getClassMarks);
router.get('/report-card/:studentId', marksController.generateReportCard);

export default router;

