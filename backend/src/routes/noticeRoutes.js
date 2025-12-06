import express from 'express';
import * as noticeController from '../controllers/noticeController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(noticeController.getNotices)
  .post(authorize('admin'), noticeController.createNotice);

router.route('/:id')
  .get(noticeController.viewNotice)
  .put(authorize('admin'), noticeController.updateNotice)
  .delete(authorize('admin'), noticeController.deleteNotice);

export default router;

