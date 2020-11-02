const express = require("express");
const pug = require("pug");
const config = require("../../config/default.json");
const router = express.Router();
const randomstring = require("randomstring");
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { AES } = require("crypto-js");
const Mailer = require("../../controllers/mailController");


//Importing DB Models
const Customer = require("../../models/Customer");
const Admin = require("../../models/Admin");



/*
Route : /api/admin/register
To Register New Admin
Public Route
*/
router.post('/register', [
    body("name", "Please Enter Valid Name").notEmpty().isString(),
    body("email", "Please Enter Valid EMail").isEmail(),
    body("role", "Role is Required").notEmpty(),
    body("password", "Password is Required").isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, email, role } = req.body;
        let customer = await Customer.findOne({ email });
        let admin = await Admin.findOne({ email });
        if (customer) {
            return res.status(500).json({ Error: `${email} is already registered as a Customer` });
        }
        if (admin) {
            return res.status(500).json({ Error: `${email} is already registered as an Admin` });
        }
        //Hash the Password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const password = await bcrypt.hash(req.body.password, salt);
        const emailtoken = randomstring.generate();

        admin = new Admin({ name, email, role, emailtoken, password });
        await admin.save();
        const verifyURL = `http://hfs.iprashanth.com/api/admin/verify/${emailtoken}`;
        const subject = "XYZ Solutions Email Verification";
        const html = pug.renderFile(__dirname + '/email.pug', { name: name, verifyURL: verifyURL });
        //Trigger Verification Email
        Mailer(email, subject, html);
        //Prepare the Payload for access token
        const payload = {
            admin: admin._id,
            role: admin.role
        }
        //Create jwt access token
        const token = await jwt.sign(payload, config.SECRET_KEY, { expiresIn: 500 });
        const cypherToken = AES.encrypt(token, config.CRYPTO_KEY).toString();
        res.status(200).json({ token: cypherToken });

    } catch (err) {
        console.error(err);
        res.status(500).json({ "Error": "Server Error" });
    }
});


/*
Route : /api/admin/verify/:emailtoken
To Verify New Admin Email
Public Route
*/
router.get('/verify/:emailtoken', async (req, res, next) => {
    try {
        const emailtoken = req.params.emailtoken;
        const data = await Admin.findOneAndUpdate({ emailtoken }, { $set: { active: true } });
        res.send(`<h1> ${data.email} is successfully verified. </h1>`);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Error": "Server Error" });
    }
});

module.exports = router;