import mongoose from 'mongoose';

const schoolInfoSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    default: 'Ananda Central College'
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  principal: {
    name: String,
    signature: String // Path to signature image
  },
  logo: {
    type: String // Path to logo image
  },
  academicYear: {
    type: String,
    required: true,
    default: function() {
      const year = new Date().getFullYear();
      return `${year}-${year + 1}`;
    }
  },
  settings: {
    enablePeriodAttendance: {
      type: Boolean,
      default: false
    },
    attendanceMarkingTime: {
      type: String, // e.g., "08:00" for morning roll-call
      default: "08:00"
    },
    gradingSystem: {
      type: String,
      enum: ['SL Standard', 'Custom'],
      default: 'SL Standard'
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('SchoolInfo', schoolInfoSchema);

