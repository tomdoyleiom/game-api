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
      _id: 0,
      gameId: '$_id',
      average_likes: 1
    }
  }
];

module.exports = averageLikes;
