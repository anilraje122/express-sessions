const mongoose = require("mongoose");

//Connection to Local DB
mongoose.connect("mongodb://127.0.0.1:27017/users", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        throw err;
    }
    console.log('Successfully Connected to Mongo DB.');
});

//Write it in Promise