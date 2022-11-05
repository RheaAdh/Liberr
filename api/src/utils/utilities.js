export const route = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export class HTTPError extends Error {
  constructor(httpCode, message = '') {
    super(message);
    this.message = message;
    this.httpCode = httpCode;
    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}

export const errorHandler = (err, req, res, next) => {
  if (!err.httpCode) {
    console.log(err);
    return res.status(500).json({
      statusCode: 500,
      error: 'Something went wrong!',
      path: req.path,
      method: req.method,
    });
  }

  res.status(err.httpCode).json({
    statusCode: err.httpCode,
    error: err.message,
    path: req.path,
    method: req.method,
  });
};

export const notFoundHandler = (req, res, next) => {
  throw new HTTPError(404, 'Route not found');
};
