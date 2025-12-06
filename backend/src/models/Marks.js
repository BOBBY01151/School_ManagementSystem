import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  term: {
    type: Number,
    enum: [1, 2, 3],
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  termMarks: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  finalMarks: {
    type: Number,
    min: 0,
    max: 100,
    default: null
  },
  grade: {
    type: String,
    enum: ['A', 'B', 'C', 'S', 'F', null],
    default: null
  },
  examType: {
    type: String,
    enum: ['Term Test 1', 'Term Test 2', 'Final Exam', 'Continuous Assessment'],
    default: 'Term Test 1'
  },
  enteredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  remarks: {
    type: String
  }
}, {
  timestamps: true
});

// Compound index
marksSchema.index({ student: 1, subject: 1, term: 1, academicYear: 1, examType: 1 }, { unique: true });

// Auto-calculate grade before saving
marksSchema.pre('save', function(next) {
  const marks = this.finalMarks !== null ? this.finalMarks : this.termMarks;
  if (marks !== null && marks !== undefined) {
    if (marks >= 75) this.grade = 'A';
    else if (marks >= 65) this.grade = 'B';
    else if (marks >= 50) this.grade = 'C';
    else if (marks >= 35) this.grade = 'S';
    else this.grade = 'F';
  }
  next();
});

export default mongoose.model('Marks', marksSchema);

