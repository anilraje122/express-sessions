var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('file', { userName: "prash", age : 25 });
});

module.exports = router;
