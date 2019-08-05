const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandling = require('./utils/errorHandling');

// allows the use of environment variables
// e.g: process.env.PORT
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

// configure express to use routes.
app.use('/games/report', reportRoute);
app.use('/games', gameRoute);
app.use('/comments', commentRoute);

// add custom error middleware
app.use(errorHandling);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useFindAndModify: false },
  () => console.log('connected to db')
);

console.log(`listening on port: ${process.env.PORT}`);
app.listen(process.env.PORT);
