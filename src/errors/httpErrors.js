import httpStatus from '../utils/httpStatus.js';

export function conflictError(message) {
  return {
    statusCode: httpStatus.CONFLICT,
    message: message ?? 'conflict error',
  };
}

export default conflictError;
