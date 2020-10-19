const express = require("express");
const app = express();
//Import DB Connection
require('./dbConnect');

//Import User Models
const Users = require('./models/Users');

app.use(express.json());

const port = process.env.PORT || 3000;


app.post('/', (req, res) => {

    const user = new Users(req.body);

    user.save((err) => {
        if (err) {
            res.send(err);
            throw err;
        }
        res.status(200).json({ "Status": "Successfully Data Stored in DB" });
    })
})




app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});