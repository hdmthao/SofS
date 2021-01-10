import SellerController from '../controllers/seller.controller';

const route = require('express').Router();

route.get('/top-sellers', SellerController.getTopSeller);

module.exports = route;
