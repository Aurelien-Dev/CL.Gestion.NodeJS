const formulaireDB = require('../db/formulaireDB')
const express = require('express');
const { result } = require('underscore');
const router = express.Router();


/**
 * Permet l'ajout d'un nouveau formulaire d'accèptation des risques
 */
router.get('/api/formulaires', function(request, response) {
    formulaireDB.getFormulaires((results) => {
        response.status(200).json(results);
    });
});

/**
 * Permet l'ajout d'un nouveau formulaire d'accèptation des risques
 */
router.get('/api/formulaires/:id', function(request, response) {
    const id = parseInt(request.params.id);

    formulaireDB.getFormulaireByNumeroSequence(id, (results) => {
        response.status(200).json(results);
    });


});

/**
 * Permet l'ajout d'un nouveau formulaire d'accèptation des risques
 */
router.post('/api/formulaires', function(request, response) {
    var datas = [
        request.body.nom,
        request.body.prenom,
        request.body.adresseCourriel,
        request.body.telephone,
        request.body.nomPrenomContact,
        request.body.adresseCourriel,
        request.body.telephoneContact,
        request.body.lienContact,
        request.body.accepteRisque
    ];

    formulaireDB.createFormulaire(datas, (results) => {
        response.status(200).json(results);
    });
});


module.exports = router;