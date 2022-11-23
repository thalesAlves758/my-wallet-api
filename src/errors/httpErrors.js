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
