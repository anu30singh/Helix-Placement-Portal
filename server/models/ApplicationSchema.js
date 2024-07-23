const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'student', // Make sure this matches the model name in your myStudent schema
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
    }
  });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
