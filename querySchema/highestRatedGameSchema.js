/**
 * Returns the highest rated game
 */
const highestRatedGame = [
  {
    $sort: {
      likes: -1
    }
  },
  {
    $project: {
      title: 1,
      _id: 0
    }
  },
  {
    $limit: 1
  }
];

module.exports = highestRatedGame;
