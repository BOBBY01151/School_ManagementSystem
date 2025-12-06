import express from 'express';
import * as assignmentController from '../controllers/assignmentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(assignmentController.getAssignments)
  .post(authorize('teacher', 'admin'), assignmentController.createAssignment);

router.post('/submit', authorize('student'), assignmentController.submitAssignment);
router.post('/grade/:submissionId', authorize('teacher', 'admin'), assignmentController.gradeSubmission);
router.get('/submissions/:assignmentId', authorize('teacher', 'admin'), assignmentController.getSubmissions);

export default router;

