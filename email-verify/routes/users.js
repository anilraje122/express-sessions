var express = require('express');
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
var router = express.Router();
const nodemailer = require("nodemailer");
const { body, validationResult } = require('express-validator');

//Import User Model
const Users = require('../models/Users');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* Users Sign Up */

//firstName,LastName,email,password
/*
1) Establish DB Connection 
2) Design Schema
3) Express Validator
4) Insert the data into DB
*/
router.post('/', [
  body('firstName', "First Name is Required").notEmpty(),
  body('lastName', "Last Name is Required").isString(),
  body('email', "Enter Valid Email").isEmail(),
  body('password', "Enter Password").isLength({ min: 6 }),
  body('password2', "Passwords Do Not Match").custom((value, { req }) => {
    if (value === req.body.password) {
      return true;
    } else {
      return false;
    }
  })
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let { email, firstName, lastName, password } = req.body;
      const user = await Users.findOne({ email: email });
      if (user) {
        return res.status(401).json({ "Error": "User Account Exists" });
      }
      //Hash the password
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      password = await bcrypt.hash(password, salt);
      const token = randomString.generate();


      const userData = {
        email, password, lastName, firstName, token
      }
      const newUser = new Users(userData);
      await newUser.save();
      res.status(200).json({ "Success": "User Registered" });

      let transporter = nodemailer.createTransport({
        host: "####",
        port: 587,
        secure: false,
        auth: {
          user: '####',
          pass: '###',
        }
      });

      transporter.sendMail({
        from: '"Anil Space Solutions 👻" <admin@anilraj.space>',
        to: email,
        subject: "Welcome to Anil Space Solutions- Email Verification ✔",
        html: `
          <p> Thank you for Signing up with us! Here is the Link to verify your email id
          </p> <b><a href='http://hfs.iprashanth.com/users/verify/${token}'> Click Here to Verify </a>  </b>
        `,
      })
        .then((info) => {
          console.log('Message sent: %s', info.messageId);

        })

    } catch (err) {
      res.status(500).json({ "Error": "Server Error" });
    }
  });


router.all('/verify/:token', async (req, res) => {
  try {
    // console.log()
    await Users.findOneAndUpdate(
      { token: req.params.token },
      { $set: { verified: true } }
    );
    res.send(`<h1> User Email Verification is Successfull</h1>`)

  } catch (err) {
    res.status(500).json({ "Error": "Server Error" });
  }
})

router.all('/example', (req, res) => {
  console.log(req.method)
  res.send(req.body);
})
module.exports = router;
