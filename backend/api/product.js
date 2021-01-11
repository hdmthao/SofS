import ProductController from '../controllers/product.controller';
import { verifyUser, verifySeller } from '../utils/jwt';
const router = require('express').Router();

router.route('/products')
  .get(ProductController.getProducts)
  .post(verifyUser, verifySeller, ProductController.createProduct);

router.get('/products/:prodId', ProductController.getProduct);
router.put('/products/:prodId', verifyUser, verifySeller, ProductController.updateProduct);

module.exports = router;
