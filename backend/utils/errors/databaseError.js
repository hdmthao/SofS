/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { DatabaseError } from './baseError';

class ParseError extends DatabaseError {
  get statusCode() {
    return 500;
  }
}

export {
  ParseError
};
