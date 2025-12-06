import * as classService from '../services/classService.js';

export const createClass = async (req, res, next) => {
  try {
    const classInstance = await classService.createClass(req.body);
    res.status(201).json({
      success: true,
      data: classInstance
    });
  } catch (error) {
    next(error);
  }
};

export const getClasses = async (req, res, next) => {
  try {
    const { grade, academicYear } = req.query;
    const classes = await classService.getClassesByGrade(grade, academicYear);
    res.status(200).json({
      success: true,
      count: classes.length,
      data: classes
    });
  } catch (error) {
    next(error);
  }
};

export const getClass = async (req, res, next) => {
  try {
    const classInstance = await classService.getClassDetails(req.params.id);
    if (!classInstance) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }
    res.status(200).json({
      success: true,
      data: classInstance
    });
  } catch (error) {
    next(error);
  }
};

export const addStudent = async (req, res, next) => {
  try {
    const { classId, studentId } = req.body;
    const classInstance = await classService.addStudentToClass(classId, studentId);
    res.status(200).json({
      success: true,
      data: classInstance
    });
  } catch (error) {
    next(error);
  }
};

export const removeStudent = async (req, res, next) => {
  try {
    const { classId, studentId } = req.body;
    const classInstance = await classService.removeStudentFromClass(classId, studentId);
    res.status(200).json({
      success: true,
      data: classInstance
    });
  } catch (error) {
    next(error);
  }
};

