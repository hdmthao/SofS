import { Seller, SellerReview, sequelize } from '../models';

export default class SellerService {
  static async getTopSeller(params) {
    const topSellers = await Seller.findAll({
      where: {
        status: true
      },
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('SellerReviews.id')), 'numReviews'],
          [sequelize.fn('SUM', sequelize.col('SellerReviews.rating')), 'rating']
        ],
        exclude: ['status', 'createdAt', 'updatedAt']
      },
      include: [{
        attributes: [],
        model: SellerReview
      }],
      group: ['Seller.id'],
      limit: params.limit,
      order: [[sequelize.col('rating'), 'DESC NULLS LAST']],
      subQuery: false,
      raw: true
    });

    return {
      topSellers
    };
  }
}
