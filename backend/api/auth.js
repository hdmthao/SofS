import AuthController from '../controllers/auth.controller';

const router = require('express').Router();

router.post('/sign-up', AuthController.signUp);

router.post('/sign-in', AuthController.signIn);

module.exports = router;
