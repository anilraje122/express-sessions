const express = require("express");
const app = express();

const port = process.env.PORT || 3000;



// app.get('/hello', (req, res) => {
//     res.json({ status: "Success. You are at /" });
// });
// app.post('/hello', (req, res) => {
//     res.json({ status: "Success. You are at /hello POST method" });
// });
// app.put('/hello', (req, res) => {
//     res.json({ status: "Success. You are at /hello PUT method" });
// });
// app.delete('/hello', (req, res) => {
//     res.json({ status: "Success. You are at /hello DELETE method" });
// });


app.all('/hello', (req, res) => {
    res.json({ status: "Success. You are at /" });
    console.log(req.method);
})


app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});

