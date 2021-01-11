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
      // eslint-disable-next-line max-len
      params.page = (req.query.pageNumber && Number(req.query.pageNumber) > 0) ? Number(req.query.pageNumber) : 1;
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
      const product = await ProductService.createProduct(req.user.id);

      return responseSuccess(res, {
        success: true,
        response: product
      });
    } catch (err) {
      logger.error(err);
      return responseError(res, err);
    }
  }

  static async updateProduct(req, res) {
    try {
      const productId = parseInt(req.params.prodId, 10);
      const product = await ProductService.updateProduct(productId, req.body);

      return responseSuccess(res, {
        succes: true,
        response: product
      })
    } catch (err) {
      logger.error(err);
      return responseError(res, err);
    }
  }
}
