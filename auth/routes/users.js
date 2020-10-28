const express = require('express');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const router = express.Router();
const { body, validationResult } = require('express-validator');

const config = require('../config/default.json');


const Users = require('../models/Users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

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
      userData.password = await bcrypt.hash(userData.password, 10);

      let newUser = new Users(userData);

      const key = config.SECRET_KEY;
      const payload = {
        user: {
          id: newUser._id
        }
      }

      const accessToken = await jwt.sign(payload, key, { expiresIn: 3000 });

      await newUser.save();

      res.status(200).json({ accessToken });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ Errors: "Unable to Create User" });
    }
  }
);


module.exports = router;
