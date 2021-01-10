import CategoryController from '../controllers/category.controller';

const router = require('express').Router();

router.route('/categories')
  .get(CategoryController.getCategories)
  .post(CategoryController.createCategory);

module.exports = router;