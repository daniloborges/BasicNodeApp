//https://gist.github.com/daniloborges/7f0f0a88cd5dfb6b5af2
import * as winston from 'winston';
import * as path from 'path';

let logger = new winston.Logger();

export default function middleware(req, res, next){
  console.log('verbose', req.method, req.url, res.statusCode);
  next();
}

//Configure overrides
switch((process.env.NODE_ENV || '').toLowerCase()){
  case 'production':
    logger.add(winston.transports.File, {
      filename: path.resolve('application.log'),

      // TODO: Set log folder
      // FIXME: Create it before run or it won't log!!
      dirname: path.resolve(__dirname, '../logs/'),

      handleExceptions: true,
      exitOnError: false,
      level: 'warn'
    });
    overrideConsole();
    break;

  case 'test':
    break; // Don't set up the logger overrides

  default:
    logger.add(winston.transports.Console, {
      colorize: true,
      timestamp: true,
      level: 'silly'
    });

    // TODO: Enable Growl support
    // FIXME: npm i winston-growl --save
    // var growl = require('winston-growl');
    // logger.add(growl, {level: 'info'});
    overrideConsole();
    break;
}

/**
 * Override the built-in console methods with winston hooks
 */
function overrideConsole(){

 /**
  * Core logging method exposed to Winston.
  * @param  {String}   [level='silly']    Level at which to log the message.
  * @param  {String}   msg      Message to log.
  * @param  {Object}   [meta]     Additional metadata to attach.
  * @param  {Function} callback Continuation to respond to when complete.
  */
  console.log = function(level, msg, meta, callback){ //eslint-disable-line no-unused-vars
    let args = Array.from(arguments);
    if(!(args[0] in logger.levels)){
      args.unshift('silly');
    }
    logger.log(...args);
  };

  console.info = function(){
    logger.info(...arguments);
  };

  console.warn = function(){
    logger.warn(...arguments);
  };

  console.error = function(){
    logger.error(...arguments);
  };

  console.debug = function(){
    logger.debug(...arguments);
  };

  console.time = function(){
    logger.profile(...arguments);
  };

  console.timeEnd = function(){
    logger.profile(...arguments);
  };
}

// TESTS:
// console.time('LSP alive');
// console.log('Lumpy Space Princess', {cantouchglob: false});
// console.info({zombiesCount: Infinity});
// console.warn('I am not getting eaten by zombies tonight!', {lumpOut: false});
// console.log('verbose', 'My formula is going to cure the zombies because I made the prettiest formula', {cure: 'Yeah!'});
// console.error('Oh My Glob! Look At Those %s Lips!', 'Luscious', {lips: 'luscious'});
// console.timeEnd('LSP alive');
