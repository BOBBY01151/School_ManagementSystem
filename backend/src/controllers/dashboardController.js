import User, { Student, Teacher, Parent } from '../models/User.js';
import Class from '../models/Class.js';
import Attendance from '../models/Attendance.js';
import Marks from '../models/Marks.js';
import Assignment from '../models/Assignment.js';
import Notice from '../models/Notice.js';
import Timetable from '../models/Timetable.js';

export const getAdminDashboard = async (req, res, next) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalClasses = await Class.countDocuments({ isActive: true });
    const totalParents = await Parent.countDocuments();

    // Stream distribution
    const streamDistribution = await Student.aggregate([
      { $match: { stream: { $ne: null } } },
      { $group: { _id: '$stream', count: { $sum: 1 } } }
    ]);

    // Grade distribution
    const gradeDistribution = await Student.aggregate([
      { $group: { _id: '$grade', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    // Recent attendance (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentAttendance = await Attendance.countDocuments({
      date: { $gte: sevenDaysAgo },
      status: 'Present'
    });

    const totalAttendanceRecords = await Attendance.countDocuments({
      date: { $gte: sevenDaysAgo }
    });
    const attendancePercentage = totalAttendanceRecords > 0 
      ? ((recentAttendance / totalAttendanceRecords) * 100).toFixed(2) 
      : 0;

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalStudents,
          totalTeachers,
          totalClasses,
          totalParents,
          attendancePercentage
        },
        streamDistribution,
        gradeDistribution
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getTeacherDashboard = async (req, res, next) => {
  try {
    const teacherId = req.user.id;
    const today = new Date();
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][today.getDay()];

    // Today's timetable
    const todaysPeriods = await Timetable.find({
      teacher: teacherId,
      day: dayOfWeek
    })
      .populate('class', 'grade section medium')
      .populate('subject', 'name code')
      .sort({ period: 1 });

    // Get classes taught by this teacher
    const classes = await Class.find({
      $or: [
        { classTeacher: teacherId },
        { subjects: { $in: await Assignment.distinct('subject', { teacher: teacherId }) } }
      ]
    }).populate('students', 'name');

    // Today's attendance
    const todayAttendance = await Attendance.countDocuments({
      markedBy: teacherId,
      date: {
        $gte: new Date(today.setHours(0, 0, 0, 0)),
        $lt: new Date(today.setHours(23, 59, 59, 999))
      }
    });

    // Pending assignments to grade
    const pendingAssignments = await Assignment.find({
      teacher: teacherId
    }).populate('submissions');

    const pendingCount = pendingAssignments.reduce((count, assignment) => {
      return count + assignment.submissions.filter(s => !s.marks).length;
    }, 0);

    // Recent notices
    const notices = await Notice.find({
      $or: [
        { targetAudience: 'All' },
        { targetAudience: 'Teachers Only' }
      ],
      isActive: true
    })
      .sort({ publishedAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        todaysPeriods,
        classes: classes.length,
        todayAttendance,
        pendingGrading: pendingCount,
        notices
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentDashboard = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const student = await Student.findById(studentId)
      .populate('currentClass');

    if (!student || !student.currentClass) {
      return res.status(404).json({
        success: false,
        message: 'Student class not found'
      });
    }

    const today = new Date();
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][today.getDay()];

    // Next class/today's timetable
    const timetable = await Timetable.find({
      class: student.currentClass._id,
      day: dayOfWeek
    })
      .populate('subject', 'name')
      .populate('teacher', 'name')
      .sort({ period: 1 });

    // Attendance percentage for current term
    const currentTerm = 1; // Should be fetched from active term
    const currentYear = '2024-2025'; // Should be current academic year
    const attendanceRecords = await Attendance.find({
      student: studentId,
      term: currentTerm,
      academicYear: currentYear
    });

    const totalDays = attendanceRecords.length;
    const presentDays = attendanceRecords.filter(a => a.status === 'Present').length;
    const attendancePercentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0;

    // Term marks summary
    const marks = await Marks.find({
      student: studentId,
      term: currentTerm,
      academicYear: currentYear
    })
      .populate('subject', 'name')
      .sort({ 'subject.name': 1 });

    // Latest notices
    const notices = await Notice.find({
      $or: [
        { targetAudience: 'All' },
        { targetGrade: student.grade },
        { targetClass: student.currentClass._id }
      ],
      isActive: true
    })
      .sort({ publishedAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        student: {
          name: student.name,
          grade: student.grade,
          section: student.currentClass.section
        },
        timetable,
        attendancePercentage,
        marks,
        notices
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getParentDashboard = async (req, res, next) => {
  try {
    const parentId = req.user.id;
    const parent = await Parent.findById(parentId)
      .populate('children', 'name admissionNumber grade currentClass');

    if (!parent || !parent.children || parent.children.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No children found'
      });
    }

    const currentTerm = 1;
    const currentYear = '2024-2025';

    // Get data for all children
    const childrenData = await Promise.all(
      parent.children.map(async (child) => {
        const attendanceRecords = await Attendance.find({
          student: child._id,
          term: currentTerm,
          academicYear: currentYear
        });

        const totalDays = attendanceRecords.length;
        const presentDays = attendanceRecords.filter(a => a.status === 'Present').length;
        const attendancePercentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0;

        const marks = await Marks.find({
          student: child._id,
          term: currentTerm,
          academicYear: currentYear
        })
          .populate('subject', 'name');

        return {
          ...child.toObject(),
          attendancePercentage,
          recentMarks: marks.slice(0, 5)
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        parent: {
          name: parent.name,
          relationship: parent.relationship
        },
        children: childrenData
      }
    });
  } catch (error) {
    next(error);
  }
};

