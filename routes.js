const cors = require('cors');
const Router = require('express').Router();
const router = require('./api').default;

exports.default = (app) => {
  app.use(cors());
  app.use('/api', router(Router));
};
