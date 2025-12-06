import mongoose from 'mongoose';

const termSchema = new mongoose.Schema({
  termNumber: {
    type: Number,
    required: true,
    enum: [1, 2, 3]
  },
  academicYear: {
    type: String,
    required: true // e.g., "2024-2025"
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  examDates: {
    termTest1: Date,
    termTest2: Date,
    finalExam: Date
  }
}, {
  timestamps: true
});

// Compound index
termSchema.index({ termNumber: 1, academicYear: 1 }, { unique: true });

export default mongoose.model('Term', termSchema);

