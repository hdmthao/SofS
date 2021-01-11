import OrderController from '../controllers/order.controller';
import { verifyUser, verifyAdmin } from '../utils/jwt';

const router = require('express').Router();

router.post('/orders', verifyUser, OrderController.createOrder);
router.get('/orders/:orderId', verifyUser, OrderController.getOrder);
router.put('/orders/:orderId/deliver', verifyUser, verifyAdmin, OrderController.deliverOrder);
router.put('/orders/:orderId/pay', verifyUser, OrderController.payOrder);

module.exports = router;
