const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Comment = require('../models/Comment');
const mostCommentsSchema = require('../querySchema/mostCommentsSchema');
const highestRatedGameSchema = require('../querySchema/highestRatedGameSchema');
const averageLikesSchema = require('../querySchema/averageLikesSchema');
/**
 * get a report of all the games
 * list the user with the most comments
 * list the highest rated game
 * list average likes per game
 */
router.get('/', async (req, res) => {
  try {
    const mostComments = (await Comment.aggregate(mostCommentsSchema))[0]._id;
    const bestGame = (await Game.aggregate(highestRatedGameSchema))[0].title;

    debugger;

    const allGames = await Game.find();
    const averageLikes = await Comment.aggregate(averageLikesSchema);

    averageLikes.forEach(game => {
      let id = game.gameId.toString();
      game.title = allGames.find(x => x.id == id).title;
      delete game.gameId;
    });

    const report = {
      user_with_most_comments: mostComments,
      highest_rated_game: bestGame,
      average_likes: averageLikes
    };
    res.status(200).json(report);
    // list all the games out
  } catch (err) {
    res.status(500).json(report);
  }
});

module.exports = router;
