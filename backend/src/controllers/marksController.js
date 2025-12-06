import * as marksService from '../services/marksService.js';

export const enterMarks = async (req, res, next) => {
  try {
    const marks = await marksService.enterMarks({
      ...req.body,
      enteredBy: req.user.id
    });
    res.status(201).json({
      success: true,
      data: marks
    });
  } catch (error) {
    next(error);
  }
};

export const enterBulkMarks = async (req, res, next) => {
  try {
    const results = await marksService.enterBulkMarks(
      req.body.marksList.map(m => ({
        ...m,
        enteredBy: req.user.id
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

export const getStudentMarks = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { term, academicYear } = req.query;
    const marks = await marksService.getStudentMarks(studentId, term, academicYear);
    res.status(200).json({
      success: true,
      count: marks.length,
      data: marks
    });
  } catch (error) {
    next(error);
  }
};

export const getClassMarks = async (req, res, next) => {
  try {
    const { classId, subjectId } = req.params;
    const { term, academicYear, examType } = req.query;
    const marks = await marksService.getClassMarks(classId, subjectId, term, academicYear, examType);
    res.status(200).json({
      success: true,
      count: marks.length,
      data: marks
    });
  } catch (error) {
    next(error);
  }
};

export const generateReportCard = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { term, academicYear } = req.query;
    const reportCard = await marksService.generateReportCard(studentId, term, academicYear);
    res.status(200).json({
      success: true,
      data: reportCard
    });
  } catch (error) {
    next(error);
  }
};

