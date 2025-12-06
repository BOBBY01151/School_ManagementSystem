import Class from '../models/Class.js';
import { Student } from '../models/User.js';
import Subject from '../models/Subject.js';
import { SUBJECTS_BY_GRADE } from '../config/constants.js';

export const createClass = async (classData) => {
  const { grade, section, medium, stream, classTeacher, academicYear } = classData;

  const newClass = await Class.create({
    grade,
    section,
    medium,
    stream: (grade >= 12) ? stream : null,
    classTeacher,
    academicYear
  });

  // Auto-assign subjects based on grade
  await assignDefaultSubjects(newClass);

  return newClass;
};

export const assignDefaultSubjects = async (classInstance) => {
  const { grade, stream } = classInstance;
  let subjects = [];

  if (SUBJECTS_BY_GRADE[grade]) {
    if (typeof SUBJECTS_BY_GRADE[grade] === 'object' && stream) {
      subjects = SUBJECTS_BY_GRADE[grade][stream] || [];
    } else if (Array.isArray(SUBJECTS_BY_GRADE[grade])) {
      subjects = SUBJECTS_BY_GRADE[grade];
    }
  }

  const subjectDocs = await Subject.find({ name: { $in: subjects } });
  classInstance.subjects = subjectDocs.map(s => s._id);
  await classInstance.save();

  return classInstance;
};

export const addStudentToClass = async (classId, studentId) => {
  const classInstance = await Class.findById(classId);
  const student = await Student.findById(studentId);

  if (!classInstance || !student) {
    throw new Error('Class or Student not found');
  }

  if (!classInstance.students.includes(studentId)) {
    classInstance.students.push(studentId);
    await classInstance.save();
  }

  student.currentClass = classId;
  student.grade = classInstance.grade;
  await student.save();

  return classInstance;
};

export const removeStudentFromClass = async (classId, studentId) => {
  const classInstance = await Class.findById(classId);
  const student = await Student.findById(studentId);

  if (classInstance) {
    classInstance.students = classInstance.students.filter(
      id => id.toString() !== studentId.toString()
    );
    await classInstance.save();
  }

  if (student) {
    student.currentClass = null;
    await student.save();
  }

  return classInstance;
};

export const getClassesByGrade = async (grade, academicYear) => {
  const query = { grade, academicYear, isActive: true };
  return await Class.find(query)
    .populate('classTeacher', 'name employeeId')
    .populate('students', 'name admissionNumber')
    .populate('subjects', 'name code');
};

export const getClassDetails = async (classId) => {
  return await Class.findById(classId)
    .populate('classTeacher')
    .populate('students')
    .populate('subjects');
};

