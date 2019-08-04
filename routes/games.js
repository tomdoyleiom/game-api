const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Comment = require('../models/Comment');

/**
 * gets all the games
 */
router.get('/', async (req, res, next) => {
  try {
    const games = await Game.find();
    res.json(games).send();
  } catch (error) {
    next(error);
  }
});
/**
 * gets a specific game by id, returns the comments as well.
 */
router.get('/:gameId', async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.gameId);
    // if the game exists, return a 200 ok response.
    if (game) {
      const comments = await Comment.find({ gameId: req.params.gameId });
      //add the comments to the game object
      game.comments = comments;
      res.status(200).json(game);
    } else {
      res.status(404).send(`unable to find game with id: ${req.params.gameId}`);
    }
  } catch (err) {
    next(error);
  }
});

/**
 * add a new game to the db.
 */
router.post('/', async (req, res, next) => {
  const game = new Game({
    title: req.body.title,
    description: req.body.description,
    by: req.body.by,
    platform: req.body.platform,
    age_rating: req.body.age_rating,
    likes: req.body.likes,
    comments: req.body.comments
  });

  try {
    const savedGame = await game.save();
    res.json(savedGame);
  } catch (error) {
    next(error);
  }
});

/**
 * delete an existing game from the db
 */
router.delete('/:gameId', async (req, res, next) => {
  // find game by id
  try {
    await Game.findByIdAndDelete(req.params.gameId);
    res.send(`game with id: ${req.params.gameId} has been deleted`);
  } catch (error) {
    next(error);
  }
});

/**
 * updates a game by its id.
 */
router.put('/:gameId', async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (game) {
      res.status(200).json(game);
    } else {
      res
        .status(404)
        .send(`unable to find game with id: ${req.params.gameId} to update`);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
