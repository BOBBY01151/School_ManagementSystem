import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  period: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  room: {
    type: String
  },
  academicYear: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Compound index for unique period allocation
timetableSchema.index({ class: 1, day: 1, period: 1, academicYear: 1 }, { unique: true });

export default mongoose.model('Timetable', timetableSchema);

