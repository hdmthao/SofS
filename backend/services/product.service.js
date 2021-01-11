import { NotFoundError } from '../utils/errors/userFacingError';
import { Product, ProductReview, SellerReview, User, Seller, sequelize } from '../models';
import { logger } from '../config/winston';
import { DatabaseError } from '../utils/errors/baseError';

export default class ProductService {
  static async getProducts(params) {
    const products = await Product.findAll({
      where: {
        status: true
      },
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('ProductReviews.id')), 'numReviews'],
          [sequelize.fn('AVG', sequelize.col('ProductReviews.rating')), 'rating']
        ],
        exclude: ['createAt', 'updateAt']
      },
      include: [{
        model: ProductReview,
        attributes: []
      }],
      group: ['Product.id'],
      limit: params.limit,
      offset: (params.page - 1) * params.limit,
      order: [['name', 'ASC']],
      subQuery: false
    });

    return {
      products
    };
  }

  static async getProduct(params) {
    const product = await Product.findOne({
      where: {
        id: params.prodId,
        status: true
      },
      include: [{
        model: Seller,
        as: 'seller',
        attributes: {
          include: [
            [sequelize.fn('COUNT', sequelize.col('SellerReviews.id')), 'numReviews'],
            [sequelize.fn('SUM', sequelize.col('SellerReviews.rating')), 'rating']
          ],
          exclude: ['status', 'createdAt', 'updatedAt']
        },
        include: [{
          attributes: ['id', 'rating'],
          model: SellerReview
        }],
        group: ['seller.id'],
        subQuery: false
      }, {
        model: ProductReview,
        as: 'reviews',
        attributes: {
          exclude: ['userId', 'updatedAt'],
        },
        include: [{
          model: User,
          as: 'reviewer',
          attributes: ['id', 'name'],
        }],
        raw: true
      }]
    });

    if (!product) {
      throw new NotFoundError('Product not found', 'not_found');
    }

    return product;
  }

  static async createProduct(data) {
    const product = await Product.create(data).catch((err) => {
      logger.error(err);
      return null;
    });

    if (!product) {
      throw new DatabaseError('Can not create product', 71);
    }

    return product;
  }
}
