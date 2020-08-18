const formulaireDB = require('../db/formulaireDB')
const membreDB = require('../db/membreDB')
const express = require('express');
const { result } = require('underscore');
const router = express.Router();
const async = require('async');

/**
 * Permet l'ajout d'un nouveau formulaire d'accèptation dess risques
 */
router.get('/api/membres', function(request, response) {
    membreDB.getMembresAutoComplete(function(membres) {
        response.status(200).json(membres);
    });
});

/**
 * Permet l'ajout d'un nouveau formulaire d'accèptation dess risques
 * @param {*} id Correspond à l'identifiant du formulaire à utiliser pour créer un membre 
 */
router.post('/api/membres/:id', function(request, response) {
    const id = parseInt(request.params.id);

    async.waterfall([
        //Obtention des information du formulaire
        function(callback) {
            formulaireDB.getFormulaireByNumeroSequence(id, function(formulaires) {
                callback(null, formulaires[0]);
            });
        },
        //Création du membre via le formulaire
        function(formulaire, callback) {
            membreDB.createMembre(formulaire, function(numSequenceMembre) {
                callback(null, formulaire.numero_sequence, numSequenceMembre);
            });
        },
        //Association du formulaire au membre qui vient d'être crée
        function(numSeqFormulaire, numSeqMembre, callback) {
            formulaireDB.associeMembre(numSeqFormulaire, numSeqMembre, function(numSequence) {
                callback(null);
            });
        }
    ], function(err) {
        if (typeof err != 'undefined') {
            response.status(500);
        }

        response.status(200).json({ success: true });
    });
});

/**
 * Permet l'ajout d'un nouveau formulaire d'accèptation dess risques
 * @param {*} id Correspond à l'identifiant du formulaire à utiliser pour créer un membre 
 */
router.put('/api/membres/ModifierRole/:id', function(request, response) {
    const id = parseInt(request.params.id);
    const role = request.body.role;

    membreDB.modifierRoleMembre(id, role, function(formulaires) {
        response.status(200).json({ success: true });
    });
});

/**
 * Permet l'ajout d'un nouveau formulaire d'accèptation dess risques
 * @param {*} id Correspond à l'identifiant du formulaire à utiliser pour créer un membre 
 */
router.put('/api/membres/desactivation/:id', function(request, response) {
    const id = parseInt(request.params.id);

    membreDB.desactivationMembreByNumeroSequence(id, function(formulaires) {
        response.status(200).json({ success: true });
    });
});

module.exports = router;