var express = require('express');
const bcrypt = require("bcrypt");
var router = express.Router();

//Import Models
const Users = require("../models/Users");


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* Registration UI Route */
router.get('/signup', (req, res) => {
  res.render("reg");
});
/* User Registration POST Route */
router.post('/signup', async (req, res) => {
  try {
    const { email, fullname } = req.body;
    const salt = await bcrypt.genSalt(15);
    const password = await bcrypt.hash(req.body.password, salt);
    const userData = new Users({ email, fullname, password });
    await userData.save();
    res.redirect("/users/login");

  } catch (err) {
    return res.status(500).json({ "Error": "Server Error" });
  }
});

/* Users Login UI */
router.get('/login', (req, res) => {
  res.render("login", { display: false });
});

/* User Login POST Route */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await Users.findOne({ email });
    //If Email ID Doesnt exist
    if (!userData) {
      return res.render("login", { display: true, message: "Email Not Found in our DB" });
    }
    const isValid = await bcrypt.compare(password, userData.password);
    if (!isValid) {
      return res.render("login", { display: true, message: "InCorrect Password." });

    }
    res.redirect("/");

  } catch (err) {
    return res.status(500).json({ "Error": "Server Error" });
  }
});


module.exports = router;
