import * as assignmentService from '../services/assignmentService.js';

export const createAssignment = async (req, res, next) => {
  try {
    const assignment = await assignmentService.createAssignment({
      ...req.body,
      teacher: req.user.id
    });
    res.status(201).json({
      success: true,
      data: assignment
    });
  } catch (error) {
    next(error);
  }
};

export const getAssignments = async (req, res, next) => {
  try {
    const { classId, studentId, term, academicYear } = req.query;
    
    let assignments;
    if (classId) {
      assignments = await assignmentService.getAssignmentsByClass(classId, term, academicYear);
    } else if (studentId) {
      assignments = await assignmentService.getAssignmentsByStudent(studentId, term, academicYear);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Please provide either classId or studentId'
      });
    }

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    next(error);
  }
};

export const submitAssignment = async (req, res, next) => {
  try {
    const submission = await assignmentService.submitAssignment({
      ...req.body,
      student: req.user.id
    });
    res.status(201).json({
      success: true,
      data: submission
    });
  } catch (error) {
    next(error);
  }
};

export const gradeSubmission = async (req, res, next) => {
  try {
    const { submissionId } = req.params;
    const { marks, feedback } = req.body;
    const submission = await assignmentService.gradeSubmission(submissionId, marks, feedback, req.user.id);
    res.status(200).json({
      success: true,
      data: submission
    });
  } catch (error) {
    next(error);
  }
};

export const getSubmissions = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;
    const submissions = await assignmentService.getSubmissionsByAssignment(assignmentId);
    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    next(error);
  }
};

