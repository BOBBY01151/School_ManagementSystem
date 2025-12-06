import * as noticeService from '../services/noticeService.js';

export const createNotice = async (req, res, next) => {
  try {
    const notice = await noticeService.createNotice({
      ...req.body,
      publishedBy: req.user.id
    });
    res.status(201).json({
      success: true,
      data: notice
    });
  } catch (error) {
    next(error);
  }
};

export const getNotices = async (req, res, next) => {
  try {
    const notices = await noticeService.getNoticesForUser(req.user.id);
    res.status(200).json({
      success: true,
      count: notices.length,
      data: notices
    });
  } catch (error) {
    next(error);
  }
};

export const viewNotice = async (req, res, next) => {
  try {
    const { id } = req.params;
    await noticeService.markNoticeAsViewed(id, req.user.id);
    const Notice = (await import('../models/Notice.js')).default;
    const notice = await Notice.findById(id)
      .populate('publishedBy', 'name')
      .populate('targetClass', 'grade section');
    
    res.status(200).json({
      success: true,
      data: notice
    });
  } catch (error) {
    next(error);
  }
};

export const updateNotice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notice = await noticeService.updateNotice(id, req.body);
    res.status(200).json({
      success: true,
      data: notice
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNotice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notice = await noticeService.deleteNotice(id);
    res.status(200).json({
      success: true,
      data: notice
    });
  } catch (error) {
    next(error);
  }
};

