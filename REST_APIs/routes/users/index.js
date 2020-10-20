const express = require("express");
//Import Models 
const User = require('../../models/Users');

const router = express.Router();


//Fetch all the Users in the Database
router.get('/', async (req, res) => {
    try {
        const userData = await User.find({}, '-password -_id');
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json({ "error": err });
    }

    // User.find({}, (err, userData) => {
    //     if (err) {
    //         throw err;
    //     } else {
    //         res.send(userData);
    //     }
    // })

});

//User Registration
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send({ "status": "User Registered Succesfully" });
    } catch (err) {
        res.status(500).json({ "error": err });
    }
});

//Edit Profile Route for User

router.put('/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        const userData = await User.findById(userID);
        if(req.body.firstName){
            userData.firstName = req.body.firstName;
        }
        if(req.body.lastName){
            userData.lastName = req.body.lastName;
        }
        if(req.body.password){
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