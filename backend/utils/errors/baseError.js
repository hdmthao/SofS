// eslint-disable-next-line max-classes-per-file
class ApplicationError extends Error {
  get name() {
    return this.constructor.name;
  }
}

class DatabaseError extends ApplicationError {
  constructor(msg, code) {
    super(msg);
    this.code = code;
  }

  get statusCode() {
    return 500;
  }
}

class UserFacingError extends ApplicationError {
  constructor(msg, code) {
    super(msg);
    this.code = code;
  }
}

module.exports = {
  ApplicationError,
  DatabaseError,
  UserFacingError
};
