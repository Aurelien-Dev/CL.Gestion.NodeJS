const formulaireDB = require('../db/formulaireDB')
const express = require('express');
const { result } = require('underscore');
const router = express.Router();


/**
 * Permet d'obtenir les formulaires d'un membre
 * @param {int} id Correspond à l'identifiant du membre
 */
router.get('/api/formulaires/:id', function(request, response) {
    const id = parseInt(request.params.id);

    formulaireDB.getFormulairesByNumeroSequenceMembre(id, (infoFicheMembre) => {
        response.status(200).json({ data: infoFicheMembre });
    });
});

/**
 * Permet de supprimer un formulaire d'accèptation des risques par son numéro de séquence
 */
router.delete('/api/formulaires/:id', function(request, response) {
    const id = parseInt(request.params.id);

    formulaireDB.deleteFormulaireByNumeroSequence(id, (results) => {
        response.status(200).json({ success: true, resultat: results });
    });
});

/**
 * Permet d'associer un formulaire d'accèptation des risques à un membre
 */
router.put('/api/formulaires/associer', function(request, response) {
    const seqFiche = parseInt(request.body.seqFiche);
    const seqMembre = parseInt(request.body.seqMembre);

    formulaireDB.associeMembre(seqFiche, seqMembre, function() {
        response.status(200).json({ success: true });
    });
});

/**
 * Permet d'associer un formulaire d'accèptation des risques à un membre
 */
router.put('/api/formulaires/dissocier/:id', function(request, response) {
    const seqFiche = parseInt(request.params.id);

    formulaireDB.dissocierMembre(seqFiche, function() {
        response.status(200).json({ success: true });
    });
});


module.exports = router;