import Notice from '../models/Notice.js';
import User from '../models/User.js';

export const createNotice = async (noticeData) => {
  return await Notice.create(noticeData);
};

export const getNoticesForUser = async (userId) => {
  const user = await User.findById(userId);
  
  if (!user) {
    return [];
  }

  const query = {
    isActive: true,
    $or: [
      { targetAudience: 'All' },
      { expiryDate: { $gte: new Date() } },
      { expiryDate: null }
    ]
  };

  // Apply role-specific filters
    if (user.role === 'student') {
      const { Student } = await import('../models/User.js');
      const student = await Student.findById(userId);
    
    if (student) {
      query.$or.push(
        { targetAudience: 'Primary', targetGrade: { $in: [1, 2, 3, 4, 5] } },
        { targetAudience: 'Junior Secondary', targetGrade: { $in: [6, 7, 8, 9] } },
        { targetAudience: 'O/L Section', targetGrade: { $in: [10, 11] } },
        { targetAudience: 'A/L Section', targetGrade: { $in: [12, 13] } },
        { targetGrade: student.grade },
        { targetClass: student.currentClass },
        { targetStream: student.stream },
        { targetMedium: student.medium }
      );
    }
  } else if (user.role === 'teacher') {
    query.$or.push({ targetAudience: 'Teachers Only' });
  }

  return await Notice.find(query)
    .populate('publishedBy', 'name')
    .populate('targetClass', 'grade section')
    .sort({ publishedAt: -1 });
};

export const markNoticeAsViewed = async (noticeId, userId) => {
  const notice = await Notice.findById(noticeId);
  
  if (!notice) {
    throw new Error('Notice not found');
  }

  // Check if already viewed
  const existingView = notice.views.find(v => v.user.toString() === userId.toString());
  
  if (!existingView) {
    notice.views.push({ user: userId, viewedAt: new Date() });
    await notice.save();
  }

  return notice;
};

export const updateNotice = async (noticeId, updateData) => {
  return await Notice.findByIdAndUpdate(noticeId, updateData, { new: true, runValidators: true });
};

export const deleteNotice = async (noticeId) => {
  return await Notice.findByIdAndUpdate(noticeId, { isActive: false }, { new: true });
};

