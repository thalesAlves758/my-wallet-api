import httpStatus from '../utils/httpStatus.js';

function errorHandler(error, req, res, next) { /* eslint-disable-line */
  if (error.statusCode) {
    return res.status(error.statusCode).send(error.message);
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
}

export default errorHandler;
