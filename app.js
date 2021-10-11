require('./models/mongodb');

var express = require('express');
var path = require('path');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view_settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// end_of_view_settings

// controllers
const adminController = require('./controllers/adminController');
app.use('/admin', adminController);
// end_of_controllers

module.exports = app;
