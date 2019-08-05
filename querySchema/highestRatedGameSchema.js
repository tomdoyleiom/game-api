/**
 * Returns the highest rated game
 */
const highestRatedGame = [
  {
    $lookup: {
      from: 'comments',
      localField: '_id',
      foreignField: 'gameId',
      as: 'comments'
    }
  },
  {
    $project: {
      title: 1,
      _id: 0,
      totalLikes: {
        $sum: '$comments.like'
      }
    }
  },
  {
    $sort: {
      totalLikes: -1
    }
  },
  {
    $limit: 1
  }
];

module.exports = highestRatedGame;
