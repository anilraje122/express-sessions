var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/contact', async (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
