const _ = require('underscore');

var env = process.env.NODE_ENV || 'dev';

var config = require('./configs/config.json')[env];

_.extend(process.env, config);


module.exports = config;

// var env = process.env.NODE_ENV || 'dev';

// var config = require('./configs/config.json')['prod'];
// config.infoDebit.rivieres = require('./configs/rivieres.json');

// module.exports = config;