import Attendance from '../models/Attendance.js';

export const markAttendance = async (attendanceData) => {
  const { student, class: classId, date, status, period, subject, markedBy, term, academicYear, remarks } = attendanceData;
  
  // Check if attendance already marked for this period
  const existing = await Attendance.findOne({
    student,
    date: new Date(date),
    period: period || null,
    term,
    academicYear
  });

  if (existing) {
    existing.status = status;
    existing.remarks = remarks;
    await existing.save();
    return existing;
  }

  return await Attendance.create({
    student,
    class: classId,
    date: new Date(date),
    status,
    period: period || null,
    subject: subject || null,
    markedBy,
    term,
    academicYear,
    remarks
  });
};

export const markBulkAttendance = async (attendanceList) => {
  const results = [];
  
  for (const attendance of attendanceList) {
    try {
      const marked = await markAttendance(attendance);
      results.push({ success: true, data: marked });
    } catch (error) {
      results.push({ success: false, error: error.message });
    }
  }
  
  return results;
};

export const getStudentAttendance = async (studentId, term, academicYear, startDate, endDate) => {
  const query = {
    student: studentId,
    term,
    academicYear
  };

  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const attendance = await Attendance.find(query)
    .populate('subject', 'name')
    .populate('markedBy', 'name')
    .sort({ date: -1 });

  const stats = calculateAttendanceStats(attendance);
  
  return { attendance, stats };
};

export const getClassAttendance = async (classId, date, term, academicYear) => {
  const dateObj = date ? new Date(date) : new Date();
  dateObj.setHours(0, 0, 0, 0);
  const nextDay = new Date(dateObj);
  nextDay.setDate(nextDay.getDate() + 1);

  return await Attendance.find({
    class: classId,
    date: {
      $gte: dateObj,
      $lt: nextDay
    },
    term,
    academicYear,
    period: null // Daily attendance (morning roll-call)
  })
    .populate('student', 'name admissionNumber')
    .sort({ 'student.name': 1 });
};

export const calculateAttendanceStats = (attendanceRecords) => {
  if (!attendanceRecords || attendanceRecords.length === 0) {
    return {
      total: 0,
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
      percentage: 0
    };
  }

  const stats = {
    total: attendanceRecords.length,
    present: 0,
    absent: 0,
    late: 0,
    excused: 0
  };

  attendanceRecords.forEach(record => {
    if (record.status === 'Present') stats.present++;
    else if (record.status === 'Absent') stats.absent++;
    else if (record.status === 'Late') stats.late++;
    else if (record.status === 'Excused') stats.excused++;
  });

  stats.percentage = ((stats.present + stats.late + stats.excused) / stats.total * 100).toFixed(2);

  return stats;
};

