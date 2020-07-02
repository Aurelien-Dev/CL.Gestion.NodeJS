var helpers = require('./helpers.js');
var dates = require('./dates.js');

//Regroupe l'enssemble des utilitaires dans un module 
var utilitaires = {
    helpers: helpers,
    timestamp: dates
}


module.exports = utilitaires