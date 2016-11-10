var express = require('express'); // Minimal and flexible Node.js web application framework
var path = require('path'); // Helper functions to help make path manipulation easier
var favicon = require('serve-favicon'); // For serving the favicon
var logger = require('morgan'); // HTTP request logger middleware
var bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property
var index = require('./routes/index')

var app = express();
app.use(function(req, res, next) {
    req.headers['if-none-match'] = 'no-match-for-this';
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

//DATABASE
var mongoose = require('mongoose');

//Global mongoose model variable
var Motion;
var mongoURI = 'mongodb://localhost/test2';
var db = mongoose.connect(mongoURI, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('DB connected!!!');
        //Create a schema
        var motionSchema = mongoose.Schema({
            Date: {
                type: Date,
                index: true
            }
        });
        //Create a Model by using the schema defined above
        Motion = mongoose.model('Motion', motionSchema);
    }
});

//ROUTES
//called when loading the webpage
app.use('/', index);

//called by the camera to invoke a timestamp on when a motion occured infront of the camera that is saved in the database
app.use('/api/camera', function(req, res) {
    if (res) {
        var currentTime = new Date();
        //currentTime.setHours(currentTime.getHours()+1);
        console.log(currentTime);

        new Motion({
            Date: currentTime
        }).save(function(err) {
            if (err) {
                throw err;
            }
            console.log('Motion data Saved to DB!');
        });
    }
});

// Called by the website client with params to specify the time frame of the data
app.get('/motion/:from/:to/', function(req, res) {
    console.log(req.params.from);
    console.log(req.params.to);
    var from = req.params.from;
    var to = req.params.to;
    Motion.find({
        Date: {
            $lte: to,
            $gte: from
        }
    }, function(err, result) {
        if (err) throw err;
        //Save the result into the response object.
        res.json(result);
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;