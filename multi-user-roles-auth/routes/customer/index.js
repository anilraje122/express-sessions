const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


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


    } catch (err) {
        console.error(err);
        res.status(500).json({ "Error": "Server Error" });
    }
});





module.exports = router;