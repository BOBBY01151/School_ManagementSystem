import { Teacher } from '../models/User.js';

export const getTeachers = async (req, res, next) => {
  try {
    const { search, isClassTeacher } = req.query;
    let query = { role: 'teacher' };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } }
      ];
    }

    if (isClassTeacher !== undefined) {
      query.isClassTeacher = isClassTeacher === 'true';
    }

    const teachers = await Teacher.find(query)
      .populate('classTeacher', 'grade section')
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers
    });
  } catch (error) {
    next(error);
  }
};

export const getTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate('classTeacher')
      .populate('subjects');
    
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.status(200).json({
      success: true,
      data: teacher
    });
  } catch (error) {
    next(error);
  }
};

export const createTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json({
      success: true,
      data: teacher
    });
  } catch (error) {
    next(error);
  }
};

export const updateTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.status(200).json({
      success: true,
      data: teacher
    });
  } catch (error) {
    next(error);
  }
};

