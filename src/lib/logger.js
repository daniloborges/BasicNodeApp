//https://gist.github.com/daniloborges/7f0f0a88cd5dfb6b5af2
'use strict';

var path = require('path');
var winston = require('winston');
var logger = new winston.Logger();
var production = (process.env.NODE_ENV || '').toLowerCase() === 'production';

module.exports = {
  middleware: function(req, res, next){
    console.log('verbose', req.method, req.url, res.statusCode);
    next();
  },
  production: production
};

// Override the built-in console methods with winston hooks
switch((process.env.NODE_ENV || '').toLowerCase()){
  case 'production':
    production = true;
    logger.add(winston.transports.File, {
      filename: path.resolve('application.log'),

      // TODO: Set log folder
      // FIXME: Create it before run or it won't log!!
      dirname: path.resolve(__dirname, '../logs/'),

      handleExceptions: true,
      exitOnError: false,
      level: 'warn'
    });
    break;

  case 'test':
    // Don't set up the logger overrides
    return;

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

    break;
}

/**
* Allows configure level on console.log, default level: silly
* console.log('verbose', 'my verbose log', {metadata: 'yeay!'})
* Won't interfere with Winston metadata logging and string interpolation
* @param {flag} check Check if 1st arg is a log level
*/
function formatArgs(args, check){

  args = Array.prototype.slice.call(args);

  if(check && !(args[0] in logger.levels)){
    args.unshift('silly');
  }

  return args;
}

console.log = function(){
  logger.log.apply(logger, formatArgs(arguments, true));
};
console.info = function(){
  logger.info.apply(logger, formatArgs(arguments));
};
console.warn = function(){
  logger.warn.apply(logger, formatArgs(arguments));
};
console.error = function(){
  logger.error.apply(logger, formatArgs(arguments));
};
console.debug = function(){
  logger.debug.apply(logger, formatArgs(arguments));
};
console.time = function(){
  logger.profile.apply(logger, formatArgs(arguments));
};
console.timeEnd = function(){
  logger.profile.apply(logger, formatArgs(arguments));
};

// TESTS:
// console.time('LSP alive');
// console.log('Lumpy Space Princess', {cantouchglob: false});
// console.info({zombiesCount: Infinity});
// console.warn('I am not getting eaten by zombies tonight!', {lumpOut: false});
// console.log('verbose', 'My formula is going to cure the zombies because I made the prettiest formula', {cure: 'Yeah!'});
// console.error('Oh My Glob! Look At Those %s Lips!', 'Luscious', {lips: 'luscious'});
// console.timeEnd('LSP alive');
