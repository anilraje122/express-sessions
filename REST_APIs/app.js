const express = require("express");
const app = express();

//Import Routes
const userRoutes = require('./routes/users');
//Import DB Connection

require('./dbConnect');


const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("This is Home Route");
});

app.use('/users',userRoutes);

app.listen(port, ()=>{
    console.log(`Server Started at ${port}`);
});




