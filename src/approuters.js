'use strict';
var express = require('express');

var router = express.Router(); //eslint-disable-line new-cap

router.get('/', function(req, res) {
	res.render('index');
});

module.exports = router;
