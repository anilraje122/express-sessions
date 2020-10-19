const mongoose = require("mongoose");
const config = require('./config/default.json');

//Connection to Local DB
// mongoose.connect("mongodb://127.0.0.1:27017/users", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('Successfully Connected to Mongo DB.');
// });

//Write it in Promise
// mongoose.connect("mongodb://localhost/db_name", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Successfully Connected to Mongo DB.');
//     })
//     .catch((err) => {
//         console.error('Something Wrong with Mongo DB Server. Please check the connection');
//     })

//Lets write in async await

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Successfully Connected to Mongo DB.');
    } catch (err) {
        console.error('Something Wrong with Mongo DB Server. Please check the connection');
    }
}

connectDB();
