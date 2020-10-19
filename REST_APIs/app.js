const express = require("express");
const app = express();
//Import DB Connection
require('./dbConnect');

//Import User Models
const Users = require('./models/Users');



const port = process.env.PORT || 3000;




app.listen(port, ()=>{
    console.log(`Server Started at ${port}`);
});