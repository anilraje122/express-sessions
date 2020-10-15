/* Manager Router */
const express = require("express");
const router = express.Router();

router.use(express.static('public'));

router.post('/', (req,res,next)=>{
    res.send("This is User Home page " + req.method);
});

router.put('/', (req,res,next)=>{
    res.send("This is User Home page " + req.method);
});

router.delete('/', (req,res,next)=>{
    res.send("This is User Home page " + req.method);
});

router.get('/dashboard', (req,res,next)=>{
    res.send("This is User Dashboard  page " + req.method);
});

router.post('/login', (req,res,next)=>{
    res.send("This is User Login page" + req.method);
});


module.exports = router;