import express from 'express';
import * as studentController from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(authorize('admin', 'teacher'), studentController.getStudents)
  .post(authorize('admin'), studentController.createStudent);

router.route('/:id')
  .get(studentController.getStudent)
  .put(authorize('admin'), studentController.updateStudent)
  .delete(authorize('admin'), studentController.deleteStudent);

export default router;

