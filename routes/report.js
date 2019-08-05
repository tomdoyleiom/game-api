const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Comment = require('../models/Comment');
const mostCommentsSchema = require('../querySchema/mostCommentsSchema');
const highestRatedGameSchema = require('../querySchema/highestRatedGameSchema');
const averageLikesSchema = require('../querySchema/averageLikesSchema');
const HttpStatus = require('http-status-codes');
/**
 * get a report of all the games
 * list the user with the most comments
 * list the highest rated game
 * list average likes per game
 */
router.get('/', async (req, res, next) => {
  try {
    const mostComments = (await Comment.aggregate(mostCommentsSchema))[0]._id;
    const bestGame = (await Game.aggregate(highestRatedGameSchema))[0].title;
    const allGames = await Game.find();
    const averageLikes = await Comment.aggregate(averageLikesSchema);

    averageLikes.forEach(game => {
      let id = game._id.toString();
      game.title = allGames.find(x => x.id == id).title;
      // don't want to return this field to the actual report, so remove.
      delete game._id;
    });

    const report = {
      user_with_most_comments: mostComments,
      highest_rated_game: bestGame,
      average_likes: averageLikes
    };
    res.status(HttpStatus.OK).json(report);
    // list all the games out
  } catch (error) {
    next(error);
  }
});

module.exports = router;
