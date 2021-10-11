const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://offersusr:ra0Jt387Cm24R6h9@db-mongodb-nyc3-46303-98a61f8c.mongo.ondigitalocean.com/offers?authSource=admin&replicaSet=db-mongodb-nyc3-46303&tls=true&tlsCAFile=/Users/user/Downloads/ca-certificate.crt',
    {
        useNewUrlParser: true
    },
    (err) => {
        if(!err) {
            console.log('Sucessfully enablished connection with MongoDB');
        }
        else {
            console.log('Failed to enablish connection with MongoDB');
            console.log('MongoDB Error: ' + err);
        }
    }
);

require('./offer.model');
require('./page.model');