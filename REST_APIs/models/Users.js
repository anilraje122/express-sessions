const mongoose = require("mongoose");
//Data Fileds : firstname, lastname, email (unique), password
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("Users",userSchema, 'users_data');
