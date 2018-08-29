'use strict';

var Uniterm = require('./Uniterm');

// Shorthand to automatically create a client
var initializer = function(username, password, device, opts) {
  return new Uniterm(username, password, device, opts);
};

// Main functional components of the Uniterm module
initializer.Uniterm = Uniterm;

// Public module interface is a function, which passes through to RestClient constructor
module.exports = initializer;
