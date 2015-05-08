import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import flash from 'flash';
import * as path from 'path';
import session from 'express-session';
//import favicon from 'serve-favicon';
import logger from './lib/logger';

/**
 * Apply custom configurations on an Express App
 * @param  {Express} app App
 */
export function configure(app){

    app.set('port', process.env.PORT || 3000);
    app.set('view engine', 'jade');
    // HACK: Path hardcoded so after compiled by babel it still will use src/views
    // and we won't need duplicate the folder to build/views. Change it if you dislike. :)
    app.set('views', path.join(__dirname, '../src/views'));

    app.disable('x-powered-by');
    app.use(logger);

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
}
