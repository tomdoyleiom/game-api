/**
 * Used to return a list of game id's and their average likes (rounded up using mongo ceiling)
 */
const averageLikes = [
  {
    $lookup: {
      from: 'games',
      localField: 'gameId',
      foreignField: '_id',
      as: 'game'
    }
  },
  {
    $group: {
      _id: '$gameId',
      totalLike: {
        $sum: '$like'
      },
      count: {
        $sum: 1
      }
    }
  },
  {
    $addFields: {
      average_likes: {
        $ceil: {
          $divide: ['$totalLike', '$count']
        }
      }
    }
  },
  {
    $project: {
      average_likes: 1
    }
  }
];

module.exports = averageLikes;
