const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

//Application Level Middleware1
app.use(express.json());

//To demonstrate path
app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});


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
    //Body Data
    console.log(req.body);
    //Path
    console.log(req.originalUrl);
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

}, (req, res, next) => {
    console.log("I am Hit 2");
    console.log(req.some_value);
    res.send("Check Console for Query Data");
    next();
}, (req, res) => {
    console.log("I am Hit 3");
    console.log(" I am End");
});


const cb0 = (req, res, next) => {
    //Query Params
    console.log(req.query);
    req.some_value = "Prashanth";
    console.log("I am Hit 1");
    next();
};
const cb1 = (req, res, next) => {
    console.log("I am Hit 2");
    console.log(req.some_value);
    res.send("Check Console for Query Data");
    next();
};

const cb2 = (req, res) => {
    console.log("I am Hit 3");
    console.log(" I am End");
};


//next() example 2
app.get('/root', cb0, cb1, cb2);


//next() example 3
app.get('/com', [cb0, cb1, cb2]);


app.get('/hello', (req, res) => {
    // res.sendStatus(500); //Only Status Code as Response
    res.status(200).json({"Status" : "Success"});
});

app.get("/download", (req, res) => {
    const filePath = path.join(__dirname, 'dummy.pdf');
    res.download(filePath);
});

app.get("/:somepath", (req, res) => {
    res.send(req.params);
});

app.get("/home/buy", (req, res) => {
    console.log("We can implement our business logic before sending any response");
    res.redirect('/hello');
})


app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});

