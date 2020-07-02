var env = process.env.NODE_ENV || 'dev';

var config = require('./configs/config.json')[env];

module.exports = config;