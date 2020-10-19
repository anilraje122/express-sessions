const express = require("express");
const app = express();
//Import DB Connection
require('./dbConnect');


const port = process.env.PORT || 3000;




app.listen(port, ()=>{
    console.log(`Server Started at ${port}`);
});