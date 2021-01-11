import { NotFoundError } from '../utils/errors/userFacingError';
import { Product, ProductReview, SellerReview, User, Seller, Category, sequelize } from '../models';
import { logger } from '../config/winston';
import { DatabaseError } from '../utils/errors/baseError';
import moment from 'moment';

export default class ProductService {
  static async getProducts(params) {
    const query = {
      status: true
    };
    if (params.sellerId) {
      query.sellerId = params.sellerId;
    }
    const products = await Product.findAll({
      where: query,
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

  static async createProduct(userId) {
    const seller = await Seller.findOne({
      where: {
        userId
      }
    });
    const sampleProduct = {
      name: `Sample_${moment.now()}`,
      sellerId: seller.id,
      image: '/images/hai-tu.jpg',
      brand: 'Default brand',
      description: 'This is a product',
      price: 1,
      countInStock: 1
    };
    const product = await Product.create(sampleProduct).catch((err) => {
      logger.error(err);
      return null;
    });

    if (!product) {
      throw new DatabaseError('Can not create product', "database_error");
    }

    return {
      product
    };
  }

  static async updateProduct(prodId, newInfo) {
    newInfo.categoryId = parseInt(newInfo.categoryId, 10);
    delete newInfo.id;
    return await Product.update(newInfo, {
      where: {
        id: prodId,
      }
    }).spread((affectedCount) => {
      if (!affectedCount) {
        throw new NotFoundError('Fail To Update Product', 'not_found');
      }
      return {
        message: 'Updated'
      };
    });
  }
}
