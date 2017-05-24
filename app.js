var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var config = require('./config');

var index = require('./routes/index');
var users = require('./routes/users');
var items = require('./routes/items');
var requests = require('./routes/requests');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(config.database)
	.then(() => console.log('connection successful'))
	.catch((err) => console.log(err));
	

const app = express();


app.set('tokenSecret', config.secret);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// Headers
app.use((err, req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  

});




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', index);
app.use('/users', users);
app.use('/items',items);
app.use('/requests',requests);

module.exports = app;
