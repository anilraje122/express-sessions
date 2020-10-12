const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
/*
clientData :
1)Query Params
2)Headers
3)Body object
4)HTTP Method
5)Path
6)Router Params
*/

app.get('/:abc', (req, res) => {

    //Router Params
    console.log(req.params);
    res.end();
})


app.get('/home/:uname', (req, res) => {

    //Router Params
    console.log(req.params);
    //Query Params
    console.log(req.query);
    res.send('I m taking hit');
})


app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});

