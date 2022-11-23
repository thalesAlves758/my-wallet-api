import httpStatus from '../utils/httpStatus.js';

export function conflictError(message) {
  return {
    statusCode: httpStatus.CONFLICT,
    message: message ?? 'Conflict',
  };
}

export function unauthorizedError(message) {
  return {
    statusCode: httpStatus.UNAUTHORIZED,
    message: message ?? 'Unauthorized',
  };
}

export function notFoundError(message) {
  return {
    statusCode: httpStatus.NOT_FOUND,
    message: message ?? 'Not found',
  };
}
