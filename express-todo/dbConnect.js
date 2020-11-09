const mongoose = require('mongoose');
const connectDB = async () => {
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    };
    try {
        await mongoose.connect("mongodb://localhost/todo", options);
        console.log('Mongo DB connected Successfully 🌵 🌵');
    } catch (err) {
        console.log(err);
    }
};

connectDB();