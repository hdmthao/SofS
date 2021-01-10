import { NotFoundError } from '../utils/errors/userFacingError';
import { Product } from '../models';
import { logger } from '../config/winston';
import { DatabaseError } from '../utils/errors/baseError';

export default class ProductService {
  static async getProducts(params) {
    const products = await Product.findAndCountAll({
      where: {
        Status: true
      },
      attributes: {
        exclude: ['createAt', 'updateAt']
      },
      limit: params.limit,
      offset: params.page * params.limit,
      order: [['Name', 'ASC']]
    });
    return {
      totalProduct: products.count,
      products: products.rows
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
        attributes: {
          include: [[sequelize.fn('')]]
        }
      }],
      raw: true
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
