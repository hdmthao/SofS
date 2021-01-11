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
          [sequelize.fn('COUNT', sequelize.col('productReviews.id')), 'numReviews'],
          [sequelize.fn('AVG', sequelize.col('productReviews.rating')), 'rating']
        ],
        exclude: ['createAt', 'updateAt']
      },
      include: [{
        model: ProductReview,
        as: 'productReviews',
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
          exclude: ['status', 'createdAt', 'updatedAt']
        },
        include: [{
          attributes: ['id'],
          as: 'sellerReviews',
          model: SellerReview
        }]
      }, {
        model: ProductReview,
        as: 'productReviews',
        attributes: {
          exclude: ['userId', 'updatedAt'],
        },
        include: [{
          model: User,
          as: 'reviewer',
          attributes: ['id', 'name'],
        }],
      }],
    });

    if (!product) {
      throw new NotFoundError('Product not found', 'not_found');
    }

    const sellerRating = await Seller.findOne({
      where: {
        status: true,
        id: product.sellerId
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
      subQuery: false,
      raw: true
    });

    const productRating = await Product.findOne({
      where: {
        status: true,
        id: params.prodId
      },
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('productReviews.id')), 'numReviews'],
          [sequelize.fn('AVG', sequelize.col('productReviews.rating')), 'rating']
        ],
        exclude: ['status', 'createdAt', 'updatedAt']
      },
      include: [{
        attributes: [],
        as: 'productReviews',
        model: ProductReview
      }],
      group: ['Product.id'],
      subQuery: false,
      raw: true
    });

    product.dataValues.seller.dataValues.numReviews = sellerRating.numReviews;
    product.dataValues.seller.dataValues.rating = sellerRating.rating;
    product.dataValues.numReviews = productRating.numReviews;
    product.dataValues.rating = productRating.rating;

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
