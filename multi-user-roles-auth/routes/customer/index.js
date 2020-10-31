const express = require("express");
const router = express.Router();
const randomstring = require("randomstring");
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const Mailer = require("../../controllers/mailController");


//Importing DB Models
const Customer = require("../../models/Customer");
const Admin = require("../../models/Admin");



/*
Route : /api/customer/register
To Register New Customer
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
        const {name,email,role} = req.body;
        let customer = await Customer.findOne({email});
        let admin = await Admin.findOne({email});
        if(customer){
            return res.status(500).json({Error : `${email} is already registered as a Customer`});
        }
        if(admin){
            return res.status(500).json({Error : `${email} is already registered as an Admin`});
        }
        //Hash the Password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const password = await bcrypt.hash(req.body.password,salt);
        const emailtoken = randomstring.generate();

        customer = new Customer({name,email,role,emailtoken,password});
        //await cusomer.save();
        const verifyURL = `https://hfs.iprashanth.com/api/customer/verify/${emailtoken}`;
        const subject = "XYZ Solutions Email Verification";
        

    } catch (err) {
        console.error(err);
        res.status(500).json({ "Error": "Server Error" });
    }
});





module.exports = router;