const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

//Import DB
require('./dbConnect');





app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});