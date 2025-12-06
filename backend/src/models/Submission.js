import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String
  },
  attachments: [{
    filename: String,
    path: String,
    mimetype: String
  }],
  marks: {
    type: Number,
    default: null
  },
  gradedAt: {
    type: Date
  },
  gradedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  feedback: {
    type: String
  },
  status: {
    type: String,
    enum: ['Submitted', 'Graded', 'Late'],
    default: 'Submitted'
  }
}, {
  timestamps: true
});

// Compound index
submissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

export default mongoose.model('Submission', submissionSchema);

