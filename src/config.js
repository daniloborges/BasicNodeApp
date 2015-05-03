'use strict';

var bodyParser = require('body-parser');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var express = require('express');
var flash = require('flash');
var logger = require('./lib/logger');
var path = require('path');
var session = require('express-session');
// var favicon = require('serve-favicon');


module.exports = function (app) {

    app.set('port', process.env.PORT || 3000);
    app.set('view engine', 'jade');
    // HACK: Path hardcoded so after compiled by babel it still will use src/views
    // and we won't need duplicate the folder to build/views. Change it if you dislike. :)
    app.set('views', path.join(__dirname, '../src/views'));

    app.disable('x-powered-by');

    app.use(logger.middleware);

    app.use(compression({ threshold: 512 }));
    // TODO: uncomment and point path at favicon if you have one
    // app.use(favicon("path to fav icon"));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser('secret token'));
    app.use(express.static(path.resolve(__dirname, '../public')));

    if (app.get('env') === 'development') {
        app.use(require('errorhandler')());
    }

    // TODO: Configure session
    app.use(session({
      name: 'session name',
      resave: true,
      saveUninitialized: true,
      secret: 'secret token'
    }));
    app.use(flash());
};
