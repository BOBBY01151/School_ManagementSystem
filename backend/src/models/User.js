import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Don't include password by default
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student', 'parent'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true,
  discriminatorKey: 'role'
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// Admin Schema
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    default: 'Administrator'
  }
});

// Teacher Schema
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  nic: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  qualification: {
    type: String
  },
  specialization: [{
    type: String
  }],
  classTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    default: null
  },
  isClassTeacher: {
    type: Boolean,
    default: false
  }
});

// Student Schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  admissionNumber: {
    type: String,
    required: true,
    unique: true
  },
  nic: {
    type: String,
    unique: true,
    sparse: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  phone: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  currentClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
  grade: {
    type: Number,
    required: true,
    min: 1,
    max: 13
  },
  section: {
    type: String,
    enum: ['Primary', 'Junior Secondary', 'O/L Section', 'A/L Section']
  },
  medium: {
    type: String,
    enum: ['Sinhala', 'Tamil', 'English'],
    required: true
  },
  stream: {
    type: String,
    enum: ['Science', 'Commerce', 'Arts', 'Technology', null],
    default: null
  },
  parents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent'
  }],
  isPrefect: {
    type: Boolean,
    default: false
  },
  prefectRole: {
    type: String
  },
  clubs: [{
    type: String
  }]
});

// Parent Schema
const parentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  relationship: {
    type: String,
    enum: ['Father', 'Mother', 'Guardian'],
    required: true
  },
  nic: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  occupation: {
    type: String
  },
  address: {
    type: String
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

export const Admin = User.discriminator('Admin', adminSchema);
export const Teacher = User.discriminator('Teacher', teacherSchema);
export const Student = User.discriminator('Student', studentSchema);
export const Parent = User.discriminator('Parent', parentSchema);

export default User;

