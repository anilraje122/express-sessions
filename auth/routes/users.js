const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');

const router = express.Router();
const { body, validationResult } = require('express-validator');

const config = require('../config/default.json');


const Users = require('../models/Users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


/* POST Users Signup */

router.post("/signup",
  [
    body("firstName", "first name is required")
      .not()
      .isEmpty()
      .isString(),
    body("lastName", "last name should be a String").isString(),
    body("email", "email is required")
      .not()
      .isEmpty()
      .isString(),
    body("password", "password is required").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(403).json({ Errors: errors.array() });
      }
      let userData = await Users.findOne({ email: req.body.email });
      if (userData) {
        return res.status(400).json({ Error: "User Already exists" });

      }
      userData = req.body;
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);

      let newUser = new Users(userData);

      const key = config.SECRET_KEY;
      const payload = {
        user: {
          id: newUser._id
        }
      } //AccessToken contains this payload

      const accessToken = await jwt.sign(payload, key, { expiresIn: 60 });

      await newUser.save();

      res.status(200).json({ accessToken });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ Errors: "Unable to Create User" });
    }
  }
);

/* POST Users Login */

router.post('/login', [

  body("email", "Email is required").notEmpty().isEmail(),
  body("password", "Password is Required").notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({ Errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    let user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ Error: "Invalid Credentials" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ Error: "Invalid Credentials" });
    }
    const payload = {
      user: {
        id: user._id
      }
    }
    const key = config.SECRET_KEY;
    const accessToken = await jwt.sign(payload, key, { expiresIn: 60 });
    return res.json({ accessToken });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ Errors: "Server Error" });
  }
})


router.get('/dashboard', auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const userData = await Users.findById(userId,'-password');
    res.json({ userData });
  } catch (err) {
    return res.status(500).json({ Error: "Server Error" });
  }
  res.send("I am Private Route");
});

module.exports = router;
