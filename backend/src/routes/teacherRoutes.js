import express from 'express';
import * as teacherController from '../controllers/teacherController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(teacherController.getTeachers)
  .post(teacherController.createTeacher);

router.route('/:id')
  .get(teacherController.getTeacher)
  .put(teacherController.updateTeacher);

export default router;

