var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(request, response, next) {


    response.send('This is the motion page');
    // console.log(res);


});

module.exports = router;
