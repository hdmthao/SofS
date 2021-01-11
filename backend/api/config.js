const router = require('express').Router();

router.get('/config/google-map', (req, res) => {
  return res.send(process.env.GOOGLE_API_KEY || '');
});

router.get('/config/paypal', (req, res) => {
  return res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

module.exports = router;
