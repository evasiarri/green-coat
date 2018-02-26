var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/order-list', function(req, res, next) {
//     console.log("order list")
// });

require('babel-register')({
    presets: [ 'es2015' ]
});
require('babel-polyfill');
require('./server');

module.exports = router;
