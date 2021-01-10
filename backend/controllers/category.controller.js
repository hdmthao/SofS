import CategoryService from '../services/category.service';
import { responseError, responseSuccess } from '../utils/APIResponse';
import { logger } from '../config/winston';
import Validator from '../utils/validator';

export default class CategoryController {
  static async getCategories(req, res) {
    try {
      const categories = await CategoryService.getCategories();

      return responseSuccess(res, {
        success: true,
        response: categories
      });
    } catch (err) {
      logger.error(err);
      return responseError(res, err);
    }
  }

  static async createCategory(req, res) {
    try {
      const payloadFields = {
        requires: ['Name']
      };

      const payload = Validator.validatePayload(req.body, payloadFields);

      const category = await CategoryService.createCategory(payload);

      return responseSuccess(res, {
        success: true,
        response: category
      });
    } catch (err) {
      logger.error(err);
      return responseError(res, err);
    }
  }
}
