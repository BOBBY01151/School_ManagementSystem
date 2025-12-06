import * as attendanceService from '../services/attendanceService.js';

export const markAttendance = async (req, res, next) => {
  try {
    const attendance = await attendanceService.markAttendance({
      ...req.body,
      markedBy: req.user.id,
      term: req.body.term || 1,
      academicYear: req.body.academicYear || '2024-2025'
    });
    res.status(201).json({
      success: true,
      data: attendance
    });
  } catch (error) {
    next(error);
  }
};

export const markBulkAttendance = async (req, res, next) => {
  try {
    const results = await attendanceService.markBulkAttendance(
      req.body.attendanceList.map(att => ({
        ...att,
        markedBy: req.user.id
      }))
    );
    res.status(201).json({
      success: true,
      results
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentAttendance = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { term, academicYear, startDate, endDate } = req.query;
    const result = await attendanceService.getStudentAttendance(
      studentId,
      term,
      academicYear,
      startDate,
      endDate
    );
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getClassAttendance = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const { date, term, academicYear } = req.query;
    const attendance = await attendanceService.getClassAttendance(classId, date, term, academicYear);
    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance
    });
  } catch (error) {
    next(error);
  }
};

