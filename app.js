const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Error = require('./models/Error');

require('dotenv/config');

// set up cors
app.use(cors());

// set up express body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// import the routes
const gameRoute = require('./routes/games');
const reportRoute = require('./routes/report');
const commentRoute = require('./routes/comments');

app.use('/games/report', reportRoute);
app.use('/games', gameRoute);
app.use('/comments', commentRoute);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useFindAndModify: false },
  () => console.log('connected to db')
);

app.use(async (error, req, res, next) => {
  await logError(error, req);
  res.status(500).send('something went wrong, please try again later');
});

app.listen(process.env.PORT);

/**
 * Logs the thrown error to the db.
 * @param {*} err
 * @param {*} req
 */
async function logError(err, req) {
  const error = new Error({
    error: err,
    request: {
      body: req.body,
      headers: req.headers,
      originalUrl: req.originalUrl
    }
  });
  const savedError = error.save().catch(err => {
    // for some reason we can't add this to the db,
    // so log to the console.
    console.error(err);
  });
}
