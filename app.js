const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//set up cors
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// import the routes
const gameRoute = require('./routes/games');
const reportRoute = require('./routes/report');
const commentRoute = require('./routes/comments');

// TODO: handle middleware here.
app.use('/games/report', reportRoute);
app.use('/games', gameRoute);
app.use('/comments', commentRoute);

app.use((err, req, res, next) => {
  logError(err, req, res, next);
  res.status(500).send('something went wrong');
});

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useFindAndModify: false },
  () => console.log('connected to db')
);

app.listen(process.env.PORT);

/**
 *
 * @param {Error} err
 * @param {*} req
 */
function logError(err, req) {
  console.error(err.stack);
  next(err);
}
