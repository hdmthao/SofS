import ProductController from '../controllers/product.controller';

const router = require('express').Router();

router.route('/products')
  .get(ProductController.getProducts)
  .post(ProductController.createProduct);

router.get('/products/:prodId', ProductController.getProduct);

module.exports = router;
