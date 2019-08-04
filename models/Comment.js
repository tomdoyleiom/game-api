const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  gameId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  user: { type: String, required: true },
  message: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comments', CommentSchema);
