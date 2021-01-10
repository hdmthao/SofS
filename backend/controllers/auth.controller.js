import AuthService from '../services/auth.service';

import { responseError, responseSuccess } from '../utils/APIResponse';
import { BadRequestError } from '../utils/errors/userFacingError';
import Validator from '../utils/validator';

const { logger } = require('../config/winston');

export default class AuthController {
  static async signUp(req, res) {
    try {
      const payloadFields = {
        requires: [['email', 'string'], ['password', 'string'], ['name', 'string']]
      };

      const payload = Validator.validatePayload(req.body, payloadFields);

      if (!Validator.validateEmail(payload.email)) {
        throw new BadRequestError('Email invalid', 'email_invalid');
      }

      const signUpResponse = await AuthService.signUp(payload);
      responseSuccess(res, {
        success: true,
        ...signUpResponse
      });
    } catch (err) {
      logger.error(err);
      responseError(res, err);
    }
  }

  static async signIn(req, res) {
    try {
      const payloadFields = {
        requires: [['email', 'string'], ['password', 'string']]
      };

      const payload = Validator.validatePayload(req.body, payloadFields);

      if (!Validator.validateEmail(payload.email)) {
        throw new BadRequestError('Email invalid', 'email_invalid');
      }

      const signInResponse = await AuthService.signIn(payload);
      responseSuccess(res, {
        success: true,
        response: signInResponse
      });
    } catch (err) {
      logger.error(err);
      responseError(res, err);
    }
  }
}
