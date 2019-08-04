const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Comment = require('../models/Comment');

router.get('/:gameId', async (req, res) => {
  try {
    const comments = await Comment.find({ gameId: req.params.gameId });
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .send(
        `unable to find comments for the game with id: ${req.params.gameId}`
      );
  }
});

router.post('/', async (req, res) => {
  const comment = new Comment({
    gameId: req.body.gameId,
    user: req.body.user,
    message: req.body.message
  });

  try {
    // check if the game specified in the comment exists
    const gameForComments = await Game.findById(comment.gameId);

    if (gameForComments) {
      // if it exists, upload the comment.
      const savedComment = await comment.save();
      res.status(200).json(savedComment);
    } else {
      // return a 404 not found response.
      res.status(404).send(`unable to find game with id: ${comment.gameId}`);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
