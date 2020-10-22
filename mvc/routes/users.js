var express = require('express');
var router = express.Router();

//Import the Models
const User = require('../models/Users');

/* GET users listing. */
router.get('/', function (req, res) {
  res.render('file', { userName: "prash", age: 25 });
});

router.get('/dashboard/:email', async (req, res) => {
  try {
    const email = req.params.email;
    let userData = await User.findOne({ email: email });
    userData = userData.toJSON();
    res.render('dashboard', {
      firstName: userData.firstName,
      lastName: userData.lastName
    });
  } catch (err) {
    res.status(500).json({ Error: "Server Error" });
  }

})


module.exports = router;
