const express = require('express');
const router = express.Router();
const async = require('async');

const membreDB = require('../../db/membreDB')
const adhesionDB = require('../../db/adhesionDB')
const typeAdhesionDB = require('../../db/typeAdhesionDB');

const gererConnexion = require('../../services/gererConnexion')
const json = require('../../configs/enumerations.json');
const utilitaires = require('../../utils/utilitaires');
const service = require('../../services/genererCarteMembre');

require('handlebars-helpers')();

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
        //Obtention des énumérations pour l'affichage de la page
        (infoMembre, callback) => {
            var listEnum = {
                ROLE: utilitaires.EnumToList(json.ROLE),
                TYPE_TRANSAC: utilitaires.EnumToList(json.TYPE_TRANSAC),
                STATUT_DEMANDE: utilitaires.EnumToList(json.STATUT_DEMANDE)
            };
            callback(null, infoMembre, listEnum);
        },
        //Obtention des types d'adhésions
        (infoMembre, listEnum, callback) => {
            typeAdhesionDB.getTypeAdhesion((typeAdhesion) => {
                callback(null, infoMembre, listEnum, typeAdhesion);
            });
        }
    ], (err, infoMembre, listEnum, typeAdhesion) => {

        if (typeof err !== 'undefined' && err !== null) {
            response.status(500);
        }

        if (infoMembre !== null && typeof infoMembre !== 'undefined') {
            response.render('administration/membre/membre-lecture', {
                membre: infoMembre,
                enumeration: listEnum,
                typeAdhesion: typeAdhesion
            });
        } else {
            response.redirect('/');
        }
    });
}]);


/*
 ** Permet de consulter un membre existant, sinon retourne a la page d'accueil
 */
router.get('/membre/ModalModifierAdhesion/:id', [gererConnexion.gererMembre, (request, response) => {
    if (request.params.id == 'undefined') {
        response.status(500);
        return;
    }

    const id = parseInt(request.params.id);

    async.waterfall([
        //Obtention des informations du membre
        (callback) => {
            adhesionDB.getAdhesionByNumeroSequence(id, (infoAdhesion) => {
                callback(null, infoAdhesion);
            });
        },
        //Obtention des énumérations pour l'affichage de la page
        (infoAdhesion, callback) => {
            var listEnum = {
                TYPE_TRANSAC: utilitaires.EnumToList(json.TYPE_TRANSAC),
                STATUT_DEMANDE: utilitaires.EnumToList(json.STATUT_DEMANDE)
            };
            callback(null, infoAdhesion, listEnum);
        }
    ], (err, infoAdhesion, listEnum) => {

        if (typeof err !== 'undefined' && err !== null) {
            response.status(500);
        }

        if (infoAdhesion !== null && typeof infoAdhesion !== 'undefined') {
            response.render('administration/membre/modalModifierAdhesion', {
                layout: false,
                infoAdhesion: infoAdhesion,
                enumeration: listEnum
            });
        } else {
            response.redirect('/');
        }
    });
}]);


/*
 ** Permet de consulter un membre existant, sinon retourne a la page d'accueil
 */
router.post('/membre/ModalModifierAdhesion/:id', [gererConnexion.gererMembre, (request, response) => {
    var donnees = {
        numero_sequence: parseInt(request.params.id),
        numero_sequence_statut_demande: parseInt(request.body.statut_demande),
        type_transaction: request.body.type_transaction,
        date_debut: request.body.date_debut,
        date_fin: request.body.date_fin
    };

    var numeroSequenceMembre = request.body.numero_sequence_membre;

    //Statut, type, DD, DF
    async.waterfall([
        //Obtention des informations du membre
        (callback) => {
            adhesionDB.updateAdhesionByNumeroSequence(donnees, (infoAdhesion) => {
                callback(null, infoAdhesion);
            });
        },
        //Obtention des énumérations pour l'affichage de la page
        (infoAdhesion, callback) => {
            var listEnum = {
                TYPE_TRANSAC: utilitaires.EnumToList(json.TYPE_TRANSAC),
                STATUT_DEMANDE: utilitaires.EnumToList(json.STATUT_DEMANDE)
            };
            callback(null, infoAdhesion, listEnum);
        }
    ], (err, infoAdhesion, listEnum) => {

        if (typeof err !== 'undefined' && err !== null) {
            response.status(500);
        }

        if (infoAdhesion !== null && typeof infoAdhesion !== 'undefined') {
            response.redirect('/membre/consulter/' + numeroSequenceMembre);
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