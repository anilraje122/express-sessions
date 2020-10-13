const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
/*
clientData :
1)Query Params
2)Headers
3)Body object
4)HTTP Method
5)Path
6)Router Params
*/

app.get('/', (req, res) => {
    //Query Params
    console.log(req.query);
    //Router Params
    console.log(req.params);
    //HTTP Method
    console.log(req.method);
    //Headers
    console.log(req.headers);
    res.end();
});

//Why Express over Node JS?
//Node : 
//MVC - Model, View, Controller (MVC Frameworks) Express/express-generator
//Middleware
/* /home route - middleware */
app.get('/home', (req, res, next) => {
    //Query Params
    console.log(req.query);
    req.some_value = "Prashanth";
    console.log("I am Hit 1");
    next();

}, (req, res,next) => {
    console.log("I am Hit 2");
    console.log(req.some_value);
    res.send("Check Console for Query Data");
    next();
}, (req, res) => {
    console.log("I am Hit 3");
    console.log(" I am End");
});


app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});

