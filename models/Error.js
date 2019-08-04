const mongoose = require('mongoose');

const ErrorSchema = mongoose.Schema({
  error: { type: String, required: true },
  request: { type: Object, required: true }
});

module.exports = mongoose.model('Error', ErrorSchema);
