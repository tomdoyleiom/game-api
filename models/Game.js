const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  by: { type: String, required: true },
  platform: { type: [String], required: true },
  age_rating: { type: String, required: true },
  comments: { type: [Object] }
});

module.exports = mongoose.model('Games', GameSchema);
