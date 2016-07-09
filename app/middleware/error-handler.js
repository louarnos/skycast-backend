'use strict';

const debug = require('debug')('skycast-inc:error-handler');
const pretty = require('js-object-pretty-print').pretty;

const errorHandler = (err, req, res, next) => {
  //jshint unused:false
  const errorResponse = {
    error: {
      message: err.message,
    },
  };

  // include stacktrace
  if (req.app.get('env') === 'development') {
    errorResponse.error.error = err;
    debug(errorResponse);
  }
  console.log(err.stack);
  res.status(err.status || 500).json(errorResponse);
};

module.exports = errorHandler;
