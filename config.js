const _ = require('underscore');

var env = process.env.NODE_ENV || 'dev';
var config = require('./configs/config.json')[env];

_.extend(process.env, config);

module.exports = process.env;