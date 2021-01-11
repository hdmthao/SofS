const router = require('express').Router();

router.get('/config/google-map', (req, res) => {
  return res.send(process.env.GOOGLE_API_KEY || '');
});

module.exports = router;
