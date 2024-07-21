const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thisSchema = new Schema({
    username: { type: String, required: true },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    qualification: {
        type: String,
        required: false,
    },
    skills: {
      type: [String],
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    board: {
      type: String,
      required: true,
    },
    stream: {
      type: String,
      required: true,
    },
    hscMarks: {
      type: Number,
      required: true,
    },
    sscMarks: {
      type: Number,
      required: true,
    },
  }, { timestamps: true });
const myStudent = mongoose.model('student', thisSchema);
module.exports = myStudent;
