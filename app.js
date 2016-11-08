var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//ROUTES
var index = require('./routes/index');
var users = require('./routes/users');
var motion = require('./routes/motion');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.use('/', index);
app.use('/users', users);
app.use('/motion', motion);

//DATABASE
var mongoose = require('mongoose');

var mongoURI = "mongodb://localhost/test2";
var db = mongoose.connect(mongoURI, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Finally connected!!!');

        //Create a schema for Book
        var bookSchema = mongoose.Schema({
            name: String,
            //Also creating index on field isbn
            isbn: {type: String, index: true},
            author: String,
            pages: Number
        });
        //Create a Model by using the schema defined above
        //Optionally one can provide the name of collection where the instances
        //of this model get stored. In this case it is "mongoose_demo". Skipping
        //this value defaults the name of the collection to plural of model name i.e books.
        var Book = mongoose.model('Book', bookSchema);
        console.log('DB done');
    }
});

//Get all the books
app.get('/book', function (req, res) {
    //Find all the books in the system.
    Book.find({}, function (err, result) {
        if (err) throw err;
        //Save the result into the response object.
        res.json(result);
    });
});













app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
