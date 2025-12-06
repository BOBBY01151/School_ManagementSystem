import express from 'express';
import * as classController from '../controllers/classController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin', 'teacher'));

router.route('/')
  .get(classController.getClasses)
  .post(authorize('admin'), classController.createClass);

router.route('/:id')
  .get(classController.getClass);

router.post('/add-student', authorize('admin'), classController.addStudent);
router.post('/remove-student', authorize('admin'), classController.removeStudent);

export default router;

