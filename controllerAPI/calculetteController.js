const express = require('express');
const session = require('express-session');
var configEnum = require('../configs/enumerations.json');
const typeAdhesionDB = require('../db/typeAdhesionDB');
const router = express.Router();
const async = require('async');
const { getMaxListeners } = require('../app');

router.post('/api/calculette/membre', function(request, response) {
    console.log(request.body.nom);
    request.session.maliste.push({nom: request.body.nom});
    response.status(200).json({ success: true });
});

module.exports = router;