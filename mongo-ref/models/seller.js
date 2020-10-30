const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cars: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Car'
        }
    ]
});

module.exports = mongoose.model('Seller', sellerSchema, "sellers");