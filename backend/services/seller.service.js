import { Seller, SellerReview, sequelize } from '../models';

export default class SellerService {
  static async getTopSeller(params) {
    const topSellers = await Seller.findAll({
      where: {
        status: true
      },
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('sellerReviews.id')), 'numReviews'],
          [sequelize.fn('AVG', sequelize.col('sellerReviews.rating')), 'rating']
        ],
        exclude: ['status', 'createdAt', 'updatedAt']
      },
      include: [{
        attributes: [],
        as: 'sellerReviews',
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
