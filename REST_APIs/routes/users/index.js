const express = require("express");
//Import Models 
const User = require('../../models/Users');

const router = express.Router();


//Fetch all the Users in the Database
router.get('/', (req, res) => {
    

    User.find({}, (err, userData) => {
        if (err) {
            throw err;
        } else {
            res.send(userData);
        }
    })

});

router.post('/', (req, res) => {
    res.send(req.method);
});

router.put('/', (req, res) => {
    res.send(req.method);
});

router.delete('/', (req, res) => {
    res.send(req.method);
});

module.exports = router;