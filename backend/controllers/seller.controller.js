import SellerService from '../services/seller.service';
import { logger } from '../config/winston';
import { responseError, responseSuccess } from '../utils/APIResponse';

export default class SellerController {
  static async getTopSeller(req, res) {
    try {
      const params = {
        limit: Math.max(parseInt(req.query.limit, 10) || 5, 1)
      };
      const topSeller = await SellerService.getTopSeller(params);

      return responseSuccess(res, {
        success: true,
        response: topSeller
      });
    } catch (err) {
      logger.error(err);
      return responseError(res, err);
    }
  }
}
