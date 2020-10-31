const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
//Import DB
require('./dbConnect');

//Importing Routes
const customerRouter = require('./routes/customer');


app.use('/api/customer', customerRouter);





app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});