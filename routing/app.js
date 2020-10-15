const express = require("express");
const fs = require("fs");
const app = express();

const port = process.env.PORT || 3000;

/* IP Logging Middleware */
app.use((req, res, next) => {
    const logIp = req.ip + " at " + new Date() + "\n";
    fs.appendFile('logs.txt', logIp, (err) => {
        if (err) {
            throw err;
        } else {
            next();
        }
    })
});

/*
Lets assume a scenario where there are three user roles.
1) Admin
2) User
3) Manager

*/

// app.get('/', (req, res) => {
//     res.send("Hello there");
//     console.log(req.method);
// });
// app.post('/', (req, res) => {
//     res.send("Hello there");
//     console.log(req.method);
// });
/* The above routes can be chianed like below */
app.get('/', (req, res) => {
    res.send("Hello there");
    console.log(req.method);
}).post('/', (req, res) => {
    res.send("Hello there");
    console.log(req.method);
});


app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});
