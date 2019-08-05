const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Comment = require('../models/Comment');
const HttpStatus = require('http-status-codes');

/**
 * Gets a comment by its gameId
 * /comments/:gameId
 */
router.get('/:gameId', async (req, res, next) => {
  try {
    let comments = await Comment.find({ gameId: req.params.gameId });
    res.status(HttpStatus.OK).json(comments);
  } catch (error) {
    next(error);
  }
});

/**
 * creates a comment upon a game with the specified id.
 * sets the date as datetime.now.
 * /comments
 */
router.post('/', async (req, res, next) => {
  const comment = new Comment({
    gameId: req.body.gameId,
    user: req.body.user,
    message: req.body.message,
    like: req.body.like
  });

  try {
    // check if the game specified in the comment exists
    const gameForComments = await Game.findById(comment.gameId);

    if (gameForComments) {
      // if it exists, upload the comment.
      const savedComment = await comment.save();
      res.status(HttpStatus.OK).json(savedComment);
    } else {
      // return a 404 not found response.
      res
        .status(HttpStatus.NOT_FOUND)
        .send(`unable to find game with id: ${comment.gameId}`);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
