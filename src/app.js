'use strict';

var express = require('express');
var app = module.exports = express();

require('./config')(app);

app.use('/', require('./approuters'));

app.listen(app.get('port'), function () {
    console.log('verbose', 'Express server listening on port ' + app.get('port'));
});
