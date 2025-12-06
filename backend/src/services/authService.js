import User, { Student, Teacher, Parent, Admin } from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async (userData) => {
  const { email, password, role, ...additionalData } = userData;
  
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  let user;
  
  switch (role) {
    case 'admin':
      user = await Admin.create({ email, password, role, ...additionalData });
      break;
    case 'teacher':
      user = await Teacher.create({ email, password, role, ...additionalData });
      break;
    case 'student':
      user = await Student.create({ email, password, role, ...additionalData });
      break;
    case 'parent':
      user = await Parent.create({ email, password, role, ...additionalData });
      break;
    default:
      throw new Error('Invalid role');
  }

  const token = generateToken(user._id);
  
  return {
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role
    }
  };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (!user.isActive) {
    throw new Error('Account is inactive. Please contact administrator.');
  }

  const isMatch = await user.comparePassword(password);
  
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id);
  
  return {
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name || user.email
    }
  };
};

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

