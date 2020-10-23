var express = require('express');
const nodemailer = require("nodemailer");
const config = require('../config/default.json');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/contact', async (req, res) => {
  const { choice, name, email, service, budget, message } = req.body;


  let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.in",
    port: 587,
    secure: false,
    auth: {
      user: config.EMAIL_USERNAME,
      pass: config.EMAIL_PASSWORD,
    }
  });

  transporter.sendMail({
    from: '"Anil Raj Space Solutions" <admin@anilraj.space>', // sender address
    to: `iprash011@gmail.com, ${email}`, // list of receivers
    subject: `Hello I am ${name}! I am trying to Reach out on .. `, // Subject line
    html: `<b>Hello I am ${name}</b> <br />
        <p> My Email ID is : ${email} </p>
        <p> My Choice is : ${choice} </p>
        <p> I am looking for this  : ${service} </p>
        <p> within this budget of  : ${budget} </p>
        <br />
        <p> Remarks : ${message}</p>
    `,
  }).then((info) => {
    console.log("Message sent: %s", info.messageId);
    res.redirect('/');
  })
    .catch((err) => {
      console.error(err);
    })
});

module.exports = router;
