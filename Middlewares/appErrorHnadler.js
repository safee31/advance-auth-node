const { customError } = require("../Helpers/customError");

exports.appErrorHandler = async (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(`Incoming Error => `, err.message || err.response.data);

  if (err.code == 11000) {
    error = customError(
      `Duplicate ${err.message.slice(err.message.indexOf("key:"))}!`,
      400
    );
  }
  if (err.name == "TokenExpiredError") {
    error = customError("Token Expired Login Again!", 401);
  }
  if (err.name == "ValidationError") {
    const msgs = Object.values(err.errors).map((v) => v.message);

    error = customError(msgs, 400);
  }

  // Handling wrong API URL
  if (err.code === "ENOTFOUND") {
    error = customError(
      "Invalid API URL. Please check the URL and try again.",
      400
    );
  }

  // Handling server closures
  if (err.code === "ECONNREFUSED") {
    error = customError(
      "The server is currently closed. Please try again later.",
      503
    );
  }

  // Handling no internet connection
  if (err.code === "ENETUNREACH") {
    error = customError(
      "No internet connection. Please check your network and try again.",
      503
    );
  }

  return res
    .status(error.statusCode || 500)
    .json(error.message || "Some Server Error!");
};
