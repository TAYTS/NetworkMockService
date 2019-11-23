module.exports = function validationHandler(errors, errorMsg, errorCode) {
  // Set fallback value
  errorMsg = errorMsg || 'Validation failed, entered data is incorrect.';
  errorCode = errorCode || 500;

  if (!errors.isEmpty()) {
    const error = new Error(errorMsg);
    error.statusCode = errorCode;
    error.data = errors.array();
    throw error;
  }
};
