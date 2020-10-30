const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Seller'
    }
});

module.exports = mongoose.model("Car", carSchema, "cars");