const express = require("express");
const fs = require("fs");
const app = express();

/* Import the Router Moudles */
const adminRoutes = require('./routes/admin');
const managerRoutes = require('./routes/manager');
const userRoutes = require('./routes/user');

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

//Admin Router
app.use('/admin',adminRoutes);
//Manager Router
app.use('/manager', managerRoutes);
//User Router
app.use(userRoutes);


app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});
