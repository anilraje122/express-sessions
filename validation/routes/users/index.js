const express = require("express");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
//Import Models 
const User = require('../../models/Users');
const { findOne } = require("../../models/Users");

const router = express.Router();

//Fetch all the Users in the Database
router.get('/', async (req, res) => {
    try {
        const userData = await User.find({}, '-password -_id');
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json({ "error": err });
    }
});

//User Registration
router.post('/', [
    body('firstName', "FirstName is Required").notEmpty(),
    body('firstName', "FirstName Type Should Be String").isString(),
    body('lastName', "Last Name Should be String").isString(),
    body("email", "Enter Valid Email Address").isEmail(),
    body("password", "Minimum 6 Characters Required").isLength({ min: 6 }).custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
            throw new Error('Password confirmation does not match password');
        }
        return value;
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ "Error": "User Already Exists!" });
        }
        let userData = new User(req.body);
        //Hash the Password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        userData.password = await bcrypt.hash(req.body.password, salt);
        console.log(salt)
        console.log(userData);

        await userData.save();
        res.send({ "status": "User Registered Succesfully" });
    } catch (err) {
        res.status(500).json({ "error": err });
    }
});


//Implement Login Route
router.post('/login', [
    body("email", "Enter Valid Email Address").isEmail(),
    body("password", "Password is Required").notEmpty()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(500).json({ "Error": "Invalid Credentials" });
            }
            const result = await bcrypt.compare(req.body.password, user.password);

            if (result) {
                return res.status(200).json({ "Success": "Login Success" });
            }
            return res.status(400).json({ "Error": "Invalid Credentials" });


        } catch (err) {
            res.status(500).json({ "error": err });
        }

    })


//Edit Profile Route for User

router.put('/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        const userData = await User.findById(userID);
        if (req.body.firstName) {
            userData.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
            userData.lastName = req.body.lastName;
        }
        if (req.body.password) {
            userData.password = req.body.password;
        }
        const user = new User(userData);
        await user.save();
        res.send(userData);
    } catch (err) {
        res.status(500).json({ "error": err });
    }
});

//Delete the user
router.delete('/:email', async (req, res) => {
    try {
        const email = req.params.email;
        await User.deleteOne({ email: email });
        res.status(200).json({ "Message": "Successfully Deleted" });
    } catch (err) {
        res.status(500).json({ "error": err });
    }
});

module.exports = router;