import ProductService from '../services/product.service';
import { responseError, responseSuccess } from '../utils/APIResponse';
import { logger } from '../config/winston';
import Validator from '../utils/validator';
import { BadRequestError } from '../utils/errors/userFacingError';

export default class ProductController {
  static async getProducts(req, res) {
    try {
      const params = {};
      params.limit = (req.query.limit && Number(req.query.limit) > 0) ? Number(req.query.limit) : 4;
      params.page = (req.query.page && Number(req.query.page) > 0) ? Number(req.query.page) : 1;
      params.name = req.query.name || '';
      params.categoryId = Number(req.query.categoryId) || null;
      params.sellerId = Number(req.query.sellerId) || null;
      params.minPrice = req.query.min && Number(req.query.min) > 0 ? Number(req.query.min) : 0;
      params.maxPrice = req.query.max && Number(req.query.max) > 0 ? Number(req.query.max) : 0;
      params.rating = req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

      const products = await ProductService.getProducts(params);

      return responseSuccess(res, {
        success: true,
        response: products
      });
    } catch (err) {
      logger.error(err);
      return responseError(res, err);
    }
  }

  static async getProduct(req, res) {
    try {
      const params = {
        prodId: parseInt(req.params.prodId, 10)
      };

      if (Number.isNaN(params.prodId)) {
        throw new BadRequestError('Product Id must be a number', 'invalid_param');
      }
      const product = await ProductService.getProduct(params);

      return responseSuccess(res, {
        success: true,
        response: product
      });
    } catch (err) {
      logger.error(err);
      return responseError(res, err);
    }
  }

  static async createProduct(req, res) {
    try {
      const payloadFields = {
        requires: ['Name', 'Image', ['CategoryId', 'number'], ['Price', 'number']],
        options: ['Brand', 'Description']
      };

      const payload = Validator.validatePayload(req.body, payloadFields);

      if (payload.Name === '') {
        throw new BadRequestError('Name must be non empty', 45);
      }
      if (payload.Price < 0) {
        throw new BadRequestError('Price must be positive', 46);
      }
      const product = await ProductService.createProduct(payload);

      return responseSuccess(res, {
        success: true,
        response: product
      });
    } catch (err) {
      logger.error(err);
      return responseError(res, err);
    }
  }
}
