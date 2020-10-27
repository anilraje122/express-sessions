const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/emailVerify',
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            }
        );
        console.log("Connected to Local DB");
    } catch (err) {
        console.log(err);
    }
}

dbConnect();

