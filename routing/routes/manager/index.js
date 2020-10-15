/* Manager Router */
const express = require("express");
const router = express.Router();

// router.get('/', (req,res,next)=>{
//     res.send("This is Manager Home page " + req.method);
// });

// router.post('/', (req,res,next)=>{
//     res.send("This is Manager Home page " + req.method);
// });

// router.put('/', (req,res,next)=>{
//     res.send("This is Manager Home page " + req.method);
// });

// router.delete('/', (req,res,next)=>{
//     res.send("This is Manager Home page " + req.method);
// });

/*
The Above route methods can be chained like below 
*/
router.route('/')
    .get((req, res, next) => {
        res.send("This is Manager Home page " + req.method);
    })
    .post((req, res, next) => {
        res.send("This is Manager Home page " + req.method);
    })
    .put((req, res, next) => {
        res.send("This is Manager Home page " + req.method);
    })
    .delete((req, res, next) => {
        res.send("This is Manager Home page " + req.method);
    });




router.get('/dashboard', (req, res, next) => {
    res.send("This is Manager Dashboard  page " + req.method);
});

router.post('/login', (req, res, next) => {
    res.send("This is Manager Login page" + req.method);
});


module.exports = router;