var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//ROUTES
var index = require('./routes/index');
//var motion = require('./routes/motion');

var app = express();
app.use(function(req, res, next) {
    req.headers['if-none-match'] = 'no-match-for-this';
    next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//DATABASE
var mongoose = require('mongoose');

//Global mongoose model variable
var Motion;
var mongoURI = "mongodb://localhost/test2";
var db = mongoose.connect(mongoURI, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('DB connected!!!');
        //Create a schema for Book
        var motionSchema = mongoose.Schema({
            Date: {type: Date, index: true}
        });
        //Create a Model by using the schema defined above
        Motion = mongoose.model('Motion', motionSchema);
    }
});

//ROUTES
app.use('/', index);
app.use('/api/camera', function (req, res) {
    if (res){
        var currentTime = new Date();
        currentTime.setHours(currentTime.getHours()+1);
        console.log(currentTime);

        // Testing adding things
        new Motion({
            Date: currentTime
        }).save(function(err) {
            if(err) {
                throw err;
            }
            console.log("Motion data Saved to DB!");
        });
    }
});

//Get all the books
app.get('/motion/:from/:to/', function (req, res) {
    //Find all the books in the system.
    console.log(req.params.from);
    console.log(req.params.to);
    var from = req.params.from;
    var to = req.params.to;
    Motion.find({
        Date:{
            $lte:to,
            $gte:from
        }
    }, function (err, result) {
        if (err) throw err;
        //Save the result into the response object.
        res.json(result);
    });
});












// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     next();
// });

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
