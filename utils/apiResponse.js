const sendSuccess = (res, message, data = null, statusCode = 200) => {
  const responsePayload = {
    success: true,
    message,
  };
  if (data !== null) {
    if (typeof data === "object" && data !== null && !Array.isArray(data)) {
      Object.assign(responsePayload, data);
    } else {
      responsePayload.data = data;
    }
  }
  return res.status(statusCode).json(responsePayload);
};

const sendError = (res, message, statusCode = 500, error = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error ? error.message || error : null,
  });
};

module.exports = {
  sendSuccess,
  sendError,
};
