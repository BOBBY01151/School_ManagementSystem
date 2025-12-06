import Assignment from '../models/Assignment.js';
import Submission from '../models/Submission.js';

export const createAssignment = async (assignmentData) => {
  return await Assignment.create(assignmentData);
};

export const getAssignmentsByClass = async (classId, term, academicYear) => {
  return await Assignment.find({
    class: classId,
    term,
    academicYear
  })
    .populate('subject', 'name code')
    .populate('teacher', 'name')
    .sort({ dueDate: -1 });
};

export const getAssignmentsByStudent = async (studentId, term, academicYear) => {
  const { Student } = await import('../models/User.js');
  const student = await Student.findById(studentId);
  
  if (!student || !student.currentClass) {
    return [];
  }

  const assignments = await Assignment.find({
    class: student.currentClass,
    term,
    academicYear
  })
    .populate('subject', 'name code')
    .populate('teacher', 'name');

  // Add submission status for each assignment
  const assignmentsWithStatus = await Promise.all(
    assignments.map(async (assignment) => {
      const submission = await Submission.findOne({
        assignment: assignment._id,
        student: studentId
      });
      
      return {
        ...assignment.toObject(),
        submission: submission || null,
        isSubmitted: !!submission,
        isOverdue: new Date(assignment.dueDate) < new Date() && !submission
      };
    })
  );

  return assignmentsWithStatus;
};

export const submitAssignment = async (submissionData) => {
  const { assignment, student, content, attachments } = submissionData;
  
  // Check if already submitted
  const existing = await Submission.findOne({ assignment, student });
  
  if (existing) {
    existing.content = content;
    existing.attachments = attachments || existing.attachments;
    existing.submittedAt = new Date();
    existing.status = new Date(existing.createdAt) > new Date(existing.assignment.dueDate) ? 'Late' : 'Submitted';
    await existing.save();
    return existing;
  }

  const assignmentDoc = await Assignment.findById(assignment);
  const isLate = new Date() > new Date(assignmentDoc.dueDate);
  
  const submission = await Submission.create({
    assignment,
    student,
    content,
    attachments,
    status: isLate ? 'Late' : 'Submitted'
  });

  // Add submission to assignment
  assignmentDoc.submissions.push(submission._id);
  await assignmentDoc.save();

  return submission;
};

export const gradeSubmission = async (submissionId, marks, feedback, gradedBy) => {
  const submission = await Submission.findById(submissionId);
  
  if (!submission) {
    throw new Error('Submission not found');
  }

  const assignment = await Assignment.findById(submission.assignment);
  
  if (marks > assignment.maxMarks) {
    throw new Error(`Marks cannot exceed ${assignment.maxMarks}`);
  }

  submission.marks = marks;
  submission.feedback = feedback;
  submission.gradedBy = gradedBy;
  submission.gradedAt = new Date();
  submission.status = 'Graded';
  await submission.save();

  return submission;
};

export const getSubmissionsByAssignment = async (assignmentId) => {
  return await Submission.find({ assignment: assignmentId })
    .populate('student', 'name admissionNumber')
    .populate('gradedBy', 'name')
    .sort({ submittedAt: -1 });
};

