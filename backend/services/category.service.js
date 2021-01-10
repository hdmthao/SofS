import { logger } from '../config/winston';
import { Category } from '../models';
import { DatabaseError } from '../utils/errors/baseError';

export default class CategoryService {
  static async getCategories() {
    const categories = await Category.findAndCountAll({
      where: {
        status: true
      },
      attributes: ['id', 'name'],
      order: [['name', 'ASC']]
    });

    return {
      totalCategory: categories.count,
      categories: categories.rows
    };
  }

  static async createCategory(data) {
    const category = await Category.create(data).catch((err) => {
      logger.error(err);
      return null;
    });

    if (!category) {
      throw new DatabaseError('Can not create category', 73);
    }

    return category;
  }
}
