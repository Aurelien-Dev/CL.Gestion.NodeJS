const express = require('express');
const router = express.Router();
const async = require('async');
const fs = require('fs');

const gererConnexion = require('../../services/gererConnexion')
const formulaireDB = require('../../db/formulaireDB')
const membreDB = require('../../db/membreDB')
const typeAdhesionDB = require('../../db/typeAdhesionDB');
const json = require('../../configs/enumerations.json');
const utilitaires = require('../../utils/utilitaires');
const service = require('../../services/genererCarteMembre');
var helpers = require('handlebars-helpers')();

/*
 ** Permet de consulter un membre existant, sinon retourne a la page d'accueil
 */
router.get('/membre/consulter/:id', [gererConnexion.gererMembre, (request, response) => {
    const id = parseInt(request.params.id);

    async.waterfall([
        //Obtention des informations du membre
        (callback) => {
            membreDB.getMembreByNumeroSequence(id, (infoMembre) => {
                callback(null, infoMembre);
            });
        },
        //Obtention de ces formulaires de risques
        (infoMembre, callback) => {
            formulaireDB.getFormulairesByNumeroSequenceMembre(id, (infoFormulairesMembre) => {
                callback(null, infoMembre, infoFormulairesMembre);
            });
        },
        //Obtention des énumérations pour l'affichage de la page
        (infoMembre, infoFormulairesMembre, callback) => {
            var listEnum = {
                ROLE: utilitaires.EnumToList(json.ROLE),
                TYPE_TRANSAC: utilitaires.EnumToList(json.TYPE_TRANSAC)
            };
            callback(null, infoMembre, infoFormulairesMembre, listEnum);
        },
        (infoMembre, infoFormulairesMembre, listEnum, callback) => {
            typeAdhesionDB.getTypeAdhesion((typeAdhesion) => {
                callback(null, infoMembre, infoFormulairesMembre, listEnum, typeAdhesion);
            });
        }
    ], (err, infoMembre, infoFormulairesMembre, listEnum, typeAdhesion) => {

        if (typeof err !== 'undefined' && err !== null) {
            response.status(500);
        }

        if (infoMembre !== null && typeof infoMembre !== 'undefined') {
            response.render('administration/membre/membre-lecture', {
                membre: infoMembre,
                formulaires: infoFormulairesMembre,
                enumeration: listEnum,
                typeAdhesion: typeAdhesion
            });
        } else {
            response.redirect('/');
        }
    });
}]);

/**
 * Permet d'obtenir la d'un membre
 */
router.get('/membre/carte/:idM/:idAdh', (request, response) => {
    const idMembre = parseInt(request.params.idM);
    const idAdhesion = parseInt(request.params.idAdh);

    membreDB.getInformationCarteMembre(idMembre, idAdhesion, (infoCarte) => {
        service.GenererCarteMembre(infoCarte, (fileName) => {
            if (fileName == null) {
                response.status(404);
            }

            response.download(fileName);
        });
    });
});

module.exports = router;