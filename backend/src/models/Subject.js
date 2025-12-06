import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  description: {
    type: String
  },
  grade: {
    type: Number,
    required: true,
    min: 1,
    max: 13
  },
  stream: {
    type: String,
    enum: ['Science', 'Commerce', 'Arts', 'Technology', null],
    default: null // null means available for all streams
  },
  isCore: {
    type: Boolean,
    default: true
  },
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  }],
  classes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }]
}, {
  timestamps: true
});

export default mongoose.model('Subject', subjectSchema);

