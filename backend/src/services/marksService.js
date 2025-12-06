import Marks from '../models/Marks.js';
import { GRADES_SCHEME } from '../config/constants.js';

export const enterMarks = async (marksData) => {
  const { student, subject, class: classId, term, academicYear, termMarks, finalMarks, examType, enteredBy, remarks } = marksData;

  // Check if marks already exist
  const existing = await Marks.findOne({
    student,
    subject,
    term,
    academicYear,
    examType
  });

  if (existing) {
    if (termMarks !== undefined) existing.termMarks = termMarks;
    if (finalMarks !== undefined) existing.finalMarks = finalMarks;
    existing.remarks = remarks || existing.remarks;
    await existing.save();
    return existing;
  }

  return await Marks.create({
    student,
    subject,
    class: classId,
    term,
    academicYear,
    termMarks: termMarks || 0,
    finalMarks: finalMarks || null,
    examType: examType || 'Term Test 1',
    enteredBy,
    remarks
  });
};

export const enterBulkMarks = async (marksList) => {
  const results = [];
  
  for (const marks of marksList) {
    try {
      const entered = await enterMarks(marks);
      results.push({ success: true, data: entered });
    } catch (error) {
      results.push({ success: false, error: error.message });
    }
  }
  
  return results;
};

export const getStudentMarks = async (studentId, term, academicYear) => {
  return await Marks.find({
    student: studentId,
    term,
    academicYear
  })
    .populate('subject', 'name code')
    .populate('enteredBy', 'name')
    .sort({ 'subject.name': 1 });
};

export const getClassMarks = async (classId, subjectId, term, academicYear, examType) => {
  const query = {
    class: classId,
    subject: subjectId,
    term,
    academicYear
  };

  if (examType) {
    query.examType = examType;
  }

  return await Marks.find(query)
    .populate('student', 'name admissionNumber')
    .sort({ finalMarks: -1, termMarks: -1 });
};

export const calculateClassPosition = async (studentId, classId, term, academicYear) => {
  const allMarks = await Marks.find({
    class: classId,
    term,
    academicYear,
    finalMarks: { $ne: null }
  });

  // Calculate total marks for each student
  const studentTotals = {};
  
  allMarks.forEach(mark => {
    const sid = mark.student.toString();
    if (!studentTotals[sid]) {
      studentTotals[sid] = { total: 0, count: 0 };
    }
    studentTotals[sid].total += mark.finalMarks;
    studentTotals[sid].count += 1;
  });

  // Calculate averages and sort
  const rankings = Object.entries(studentTotals)
    .map(([sid, data]) => ({
      student: sid,
      average: data.total / data.count,
      total: data.total
    }))
    .sort((a, b) => b.average - a.average);

  const position = rankings.findIndex(r => r.student === studentId.toString()) + 1;
  
  return {
    position,
    totalStudents: rankings.length,
    average: rankings[position - 1]?.average || 0
  };
};

export const generateReportCard = async (studentId, term, academicYear) => {
  const marks = await getStudentMarks(studentId, term, academicYear);
  const { Student } = await import('../models/User.js');
  const Class = (await import('../models/Class.js')).default;
  
  const student = await Student.findById(studentId);
  const classInstance = await Class.findById(student.currentClass)
    .populate('classTeacher', 'name');

  const position = await calculateClassPosition(studentId, student.currentClass, term, academicYear);

  const subjects = marks.map(m => ({
    subject: m.subject.name,
    code: m.subject.code,
    termMarks: m.termMarks,
    finalMarks: m.finalMarks,
    grade: m.grade,
    examType: m.examType
  }));

  return {
    student: {
      name: student.name,
      admissionNumber: student.admissionNumber,
      grade: student.grade,
      section: classInstance ? classInstance.section : null,
      medium: student.medium
    },
    term,
    academicYear,
    subjects,
    position,
    classTeacher: classInstance?.classTeacher?.name || 'N/A'
  };
};

