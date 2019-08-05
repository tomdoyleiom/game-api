const Error = require('./../models/Error');
/**
 *
 * @param {*} error the error thrown by the application
 * @param {*} req the original request
 * @param {*} res the response to be sent by the application
 * @param {*} next the function in the pipeline
 */
const errorHandling = async (error, req, res, next) => {
  await logError(error, req);
  res.status(500).send('something went wrong, please try again later');
};

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
    // if we can't log it to the db
    // log it to the console
    console.error(err);
  });
}

module.exports = errorHandling;
