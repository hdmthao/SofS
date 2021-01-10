/* eslint-disable class-methods-use-this */
/* eslint-disable-next-line max-classes-per-file */
import { UserFacingError } from './baseError';

class BadRequestError extends UserFacingError {
  get statusCode() {
    return 400;
  }
}

class NotFoundError extends UserFacingError {
  get statusCode() {
    return 404;
  }
}

class ForbiddenError extends UserFacingError {
  get statusCode() {
    return 403;
  }
}

class ConflictError extends UserFacingError {
  get statusCode() {
    return 409;
  }
}

export {
  BadRequestError,
  NotFoundError,
  ConflictError,
  ForbiddenError
};
