var express = require('express'); // Minimal and flexible Node.js web application framework
var path = require('path'); // Helper functions to make path manipulation easier
var favicon = require('serve-favicon'); // For serving the favicon (not really needed but removes a 404 request)
var logger = require('morgan'); // HTTP request logger middleware
var bodyParser = require('body-parser'); // Parse incoming request bodies before handlers, then available under the req.body property
var index = require('./routes/index') // Our index page and starting point

var app = express();
app.use(function(req, res, next) {
    req.headers['if-none-match'] = 'no-match-for-this';
    next();
});

// view engine setup. Some magic to map views to routes/page
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// General page setup
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// DATABASE
var mongoose = require('mongoose'); // Driver to use MongoDB
mongoose.Promise = global.Promise; // Solves https://github.com/Automattic/mongoose/issues/4291
// Global mongoose model variable
var Motion;
var mongoURI = 'mongodb://localhost/motions';
var db = mongoose.connect(mongoURI, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('DB connected');
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
        console.log(currentTime);

        new Motion({
            Date: currentTime
        }).save(function(err) {
            if (err) {
                throw err;
            }
            console.log('Motion data saved to DB');
        });
    }
});

// Called by the website client with params to specify the time frame of the data
app.get('/api/motion/:from/:to/', function(req, res) {
    var from = req.params.from;
    var to = req.params.to;
    console.log(from);
    console.log(to);
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