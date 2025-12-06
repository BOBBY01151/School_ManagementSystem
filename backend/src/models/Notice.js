import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['General', 'Academic', 'Sports', 'Events', 'Ministry Circular', 'Examination'],
    default: 'General'
  },
  priority: {
    type: String,
    enum: ['Low', 'Normal', 'High', 'Urgent'],
    default: 'Normal'
  },
  targetAudience: {
    type: String,
    enum: ['All', 'Primary', 'Junior Secondary', 'O/L Section', 'A/L Section', 'Grade Specific', 'Class Specific', 'Teachers Only'],
    default: 'All'
  },
  targetGrade: {
    type: Number,
    min: 1,
    max: 13,
    default: null
  },
  targetClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    default: null
  },
  targetStream: {
    type: String,
    enum: ['Science', 'Commerce', 'Arts', 'Technology', null],
    default: null
  },
  targetMedium: {
    type: String,
    enum: ['Sinhala', 'Tamil', 'English', null],
    default: null
  },
  attachments: [{
    filename: String,
    path: String,
    mimetype: String,
    size: Number
  }],
  publishedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    viewedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

export default mongoose.model('Notice', noticeSchema);

