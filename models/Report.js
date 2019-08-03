const mongoose = require('mongoose');

const GameLikeSchema = mongoose.Schema({
  title: { type: String, required: true },
  average_likes: { type: String, required: true }
});

const ReportSchema = mongoose.Schema({
  user_with_most_comments: { type: String, required: true },
  highest_rated_game: { type: String, required: true },
  average_likes_per_game: { type: [GameLikeSchema], required: true }
});

module.exports = mongoose.model('Reports');
