const express = require("express");
const router = express.Router();

router.get('/', (req,res)=>{
    res.send(req.method);
});

router.post('/', (req,res)=>{
    res.send(req.method);
});

router.put('/', (req,res)=>{
    res.send(req.method);
});

router.delete('/', (req,res)=>{
    res.send(req.method);
});

module.exports = router;