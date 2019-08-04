/**
 * returns the user who has made the most comments
 */
const mostComments = [
  {
    $group: {
      _id: '$user',
      comments: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      comments: -1
    }
  },
  {
    $limit: 1
  },
  {
    $project: {
      _id: 1
    }
  }
];

module.exports = mostComments;
