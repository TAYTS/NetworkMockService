module.exports = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Server error';

  res.status(status).json({
    data: {
      message,
      error: error.data,
    },
  });
};
