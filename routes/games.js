const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Comment = require('../models/Comment');
const HttpStatus = require('http-status-codes');

/**
 * gets all the games
 * /games
 */
router.get('/', async (req, res, next) => {
  try {
    const games = await Game.find();
    res.status(HttpStatus.OK).json(games);
  } catch (error) {
    next(error);
  }
});
/**
 * gets a specific game by id, returns the comments as well.
 * /games/:gameId
 */
router.get('/:gameId', async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.gameId);
    // if the game exists, return a 200 ok response.
    if (game) {
      const comments = await Comment.find({ gameId: req.params.gameId });

      // sums all the likes and returns them as a single value
      let totalLikes = comments.reduce(getTotalLikes, 0);

      //add the comments and the likes to the game object
      debugger;
      game.likes = totalLikes;
      game.comments = comments;
      res.status(HttpStatus.OK).json(game);
    } else {
      res
        .status(HttpStatus.NOT_FOUND)
        .send(`unable to find game with id: ${req.params.gameId}`);
    }
  } catch (err) {
    next(error);
  }
});

/**
 * add a new game to the db.
 * /games
 */
router.post('/', async (req, res, next) => {
  const game = new Game({
    title: req.body.title,
    description: req.body.description,
    by: req.body.by,
    platform: req.body.platform,
    age_rating: req.body.age_rating,
    comments: req.body.comments
  });

  try {
    const savedGame = await game.save();
    res.status(HttpStatus.OK).json(savedGame);
  } catch (error) {
    next(error);
  }
});

/**
 * delete an existing game from the db
 * /games/:gameId
 */
router.delete('/:gameId', async (req, res, next) => {
  // find game by id
  try {
    await Game.findByIdAndDelete(req.params.gameId);
    res
      .status(HttpStatus.OK)
      .send(`game with id: ${req.params.gameId} has been deleted`);
  } catch (error) {
    next(error);
  }
});

/**
 * updates a game by its id.
 * /games/:gameId
 */
router.put('/:gameId', async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (game) {
      res.status(HttpStatus.OK).json(game);
    } else {
      res
        .status(HttpStatus.NOT_FOUND)
        .send(`unable to find game with id: ${req.params.gameId} to update`);
    }
  } catch (error) {
    next(error);
  }
});

// used to reduce comments into a total comment value
function getTotalLikes(total, comment) {
  return total + comment.like;
}

module.exports = router;
