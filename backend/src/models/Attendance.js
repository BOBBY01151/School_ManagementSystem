import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late', 'Excused'],
    required: true,
    default: 'Present'
  },
  period: {
    type: Number, // 1-8 for period-wise attendance, null for daily attendance
    default: null
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    default: null // null for morning roll-call, otherwise specific subject
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  remarks: {
    type: String
  },
  term: {
    type: Number,
    enum: [1, 2, 3],
    required: true
  },
  academicYear: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
attendanceSchema.index({ student: 1, date: 1, period: 1 });
attendanceSchema.index({ class: 1, date: 1 });
attendanceSchema.index({ term: 1, academicYear: 1, student: 1 });

export default mongoose.model('Attendance', attendanceSchema);

