const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobListing',
    required: true
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  interviewDate: {
    type: {
      start: Date,
      end: Date
    },
    required: false
  }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
