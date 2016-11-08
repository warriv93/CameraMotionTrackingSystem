var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(request, response, next) {



    console.log("REQ" + request);
    console.log("RES" + response);

});

module.exports = router;
