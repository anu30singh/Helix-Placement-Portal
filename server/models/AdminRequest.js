const mongoose = require('mongoose');

const AdminRequestSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true }, 
});

module.exports = mongoose.model('AdminRequest', AdminRequestSchema);
