const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ref',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            throw err;
        } else {
            console.log('DB Connected');
        }
    });
