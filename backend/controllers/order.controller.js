import OrderService from '../services/order.service';
import { responseError, responseSuccess } from '../utils/APIResponse';
import { logger } from '../config/winston';

export default class OrderController {
  static async getOrder(req, res) {
    try {
      const order = await OrderService.getOrder(req.params.orderId, req.user);

      return responseSuccess(res, {
        success: true,
        response: order
      });
    } catch (err) {
      logger.error(err);
      return responseError(res, err);
    }
  }

  static async createOrder(req, res) {
    try {
      const order = await OrderService.createOrder(req.user.id, req.body);
      return responseSuccess(res, {
        success: true,
        response: order
      });
    } catch (err) {
      logger.error(err);
      return responseError(res, err);
    }
  }

  static async payOrder(req, res) {
    try {
      await OrderService.payOrder(req.params.orderId);

      return responseSuccess(res, {
        success: true,
        response: {
          message: 'Paid'
        }
      })
    } catch (err) {
      logger.error(err);
      return responseError(res, err);
    }
  }

  static async deliverOrder(req, res) {
    try {
      await OrderService.deliverOrder(req.params.orderId);
  
      return responseSuccess(res, {
        success: true,
        response: 'Delivered'
      })
    } catch (err) {
      logger.error(err);
      responseError(res, err);
    }
  }
}
