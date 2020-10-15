/* Admin Router */
const express = require("express");
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.send("This is Admin Home page" + req.method);
});

router.post('/', (req,res,next)=>{
    res.send("This is Admin Home page" + req.method);
});

router.put('/', (req,res,next)=>{
    res.send("This is Admin Home page" + req.method);
});

router.delete('/', (req,res,next)=>{
    res.send("This is Admin Home page" + req.method);
});

router.get('/dashboard', (req,res,next)=>{
    res.send("This is Admin Dashboard  page" + req.method);
});

router.post('/login', (req,res,next)=>{
    res.send("This is Admin Login page" + req.method);
});


module.exports = router;