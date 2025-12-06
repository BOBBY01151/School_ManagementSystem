import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  grade: {
    type: Number,
    required: true,
    min: 1,
    max: 13
  },
  section: {
    type: String,
    required: true, // A, B, C, etc.
    uppercase: true
  },
  medium: {
    type: String,
    enum: ['Sinhala', 'Tamil', 'English'],
    required: true
  },
  stream: {
    type: String,
    enum: ['Science', 'Commerce', 'Arts', 'Technology', null],
    default: null // Only for Grade 12-13
  },
  classTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    default: null
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  capacity: {
    type: Number,
    default: 40
  },
  academicYear: {
    type: String,
    required: true, // e.g., "2024-2025"
    default: function() {
      const year = new Date().getFullYear();
      return `${year}-${year + 1}`;
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index for unique class identification
classSchema.index({ grade: 1, section: 1, medium: 1, stream: 1, academicYear: 1 }, { unique: true });

// Virtual for class name
classSchema.virtual('className').get(function() {
  if (this.grade >= 12) {
    return `Grade ${this.grade} ${this.section} - ${this.stream || ''} (${this.medium})`;
  }
  return `Grade ${this.grade} ${this.section} (${this.medium})`;
});

classSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Class', classSchema);

