/**
 * @desc Override the default express error handler to customize output
 */
const errorHandler = (err, req, res, next) => {
  // if we already have set the status code in the response to the user then use that status code else use 500
  console.log("ERROR MIDDLEWARE CALLED");
  const statusCode = res.statusCode ? res.statusCode : 500;
  // res.status(statusCode);
  // send json to the user. only send the stack trace when in development mode
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
