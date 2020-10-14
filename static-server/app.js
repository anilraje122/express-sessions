const express = require("express");
const path = require("path");
const serveIndex = require('serve-index');
const app = express();

const port = process.env.PORT || 3000;

//Serving Static Files

app.use(express.static("views"));

app.use("/home", express.static("views"));

app.use("/books", express.static("Books"), serveIndex('Books', { 'icons': true }));

app.get('/download/:fileid', (req, res) => {
    const filePath = path.join(__dirname, req.params.fileid);
    res.download(filePath);
});


app.listen(port, () => {
    console.log(`Server started at ${port}`);
});