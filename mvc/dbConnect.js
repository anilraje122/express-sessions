const mongoose = require("mongoose");
const dbURI = 'mongodb://localhost/restapi';

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Mongo DB Connected to App.");
    } catch (err) {
        console.error(err);
    }
}

connectDB();