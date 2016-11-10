var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(request, response, next) {

    response.render('index', {
        title: 'Motion camera timeline'
    });

    request.on('data', function(chunk) {
        console.log('GOT DATA!');

    });
});

module.exports = router;