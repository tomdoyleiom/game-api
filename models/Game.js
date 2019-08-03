const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now }
});

const GameSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  by: { type: String, required: true },
  platform: { type: [String], required: true },
  age_rating: { type: String, required: true },
  likes: { type: Number, required: true },
  comments: { type: [CommentSchema] }
});

module.exports = mongoose.model('Games', GameSchema);
