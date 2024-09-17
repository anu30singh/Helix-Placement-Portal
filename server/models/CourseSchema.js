const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    oldPrice: Number,
    rating: Number,
    reviews: Number,
    image: String
  });
  
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;