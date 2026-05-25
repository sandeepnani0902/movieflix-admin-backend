const { sendError } = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
  console.error("Global Error Caught:", err);
  const status = err.statusCode || 500;
  const message = err.message || "An unexpected error occurred on the server.";
  return sendError(res, message, status, err);
};

module.exports = errorHandler;
