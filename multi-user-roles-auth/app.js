const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
//Import DB
require('./dbConnect');

//Importing Routes
const customerRouter = require('./routes/customer');
const adminRouter = require('./routes/admin');


app.use('/api/customer', customerRouter);
app.use('/api/admin', adminRouter);




app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});