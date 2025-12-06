import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
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
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  maxMarks: {
    type: Number,
    required: true,
    default: 100
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
  attachments: [{
    filename: String,
    path: String,
    mimetype: String
  }],
  submissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission'
  }]
}, {
  timestamps: true
});

export default mongoose.model('Assignment', assignmentSchema);

