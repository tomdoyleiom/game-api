const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

/**
 * get a report of all the games
 * list the user with the most comments
 * list the highest rated game
 * list average likes per game
 */
router.get('/', async (req, res) => {
  try {
    // const mostComments = await Game.findOne().sort({ comments: -1 });
    const mostLikes = await Game.findOne().sort({ likes: -1 });
    console.log(mostLikes.title);
    const report = {
      highest_rated_game: mostLikes.title
    };
    res.status(200).json(report);
    // list all the games out
  } catch (err) {
    res.status(500).json(report);
  }
});

module.exports = router;
