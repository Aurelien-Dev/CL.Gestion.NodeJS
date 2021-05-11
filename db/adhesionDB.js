const db = require('../db/baseDB');
const moment = require('moment');
const json = require('../configs/enumerations.json');

const getAdhesionByNumeroSequenceMembre = (id, callback) => {
    db.query(`select adh.numero_sequence, 
                     to_char(adh.date_debut, 'YYYY-MM-DD') as date_debut,
                     to_char(adh.date_fin, 'YYYY-MM-DD') as date_fin,
                     numero_sequence_membre,
                     montant_paye,
                     date_transaction,
                     type_transaction,
                     etudiant,
                     tadh.nom,
                     tadh.adresse_carte,
                     numero_sequence_statut_demande,
                     NOW() < adh.date_fin as adh_actif,
                     commentaire,
                     numero_membre
                from public.adhesion adh
          inner join public.type_adhesion tadh
            on adh.numero_sequence_type_adhesion= tadh.numero_sequence
               where adh.numero_sequence_membre = $1
            order by adh.date_debut desc`, [id], (error, results) => {
        if (error) {
            throw error;
        }

        var adhesions = results.rows.map(adhesion => {
            adhesion.libelle_statut_demande = json.STATUT_DEMANDE[adhesion.numero_sequence_statut_demande];
            return adhesion;
        })

        callback(adhesions);
    });
};

const getAdhesionByNumeroSequence = (id, callback) => {
    db.query(`select adh.numero_sequence, 
                     to_char(adh.date_debut, 'YYYY-MM-DD') as date_debut,
                     to_char(adh.date_fin, 'YYYY-MM-DD') as date_fin,
                     numero_sequence_membre,
                     montant_paye,
                     date_transaction,
                     type_transaction,
                     etudiant,
                     tadh.nom,
                     tadh.adresse_carte,
                     numero_sequence_statut_demande,
                     NOW() < adh.date_fin as adh_actif,
                     commentaire,
                     numero_membre
                from public.adhesion adh
          inner join public.type_adhesion tadh
            on adh.numero_sequence_type_adhesion= tadh.numero_sequence
               where adh.numero_sequence = $1
            order by adh.date_debut desc`, [id], (error, results) => {
        if (error) {
            throw error;
        }

        var adhesion = results.rows.map(adhesion => {
            adhesion.libelle_statut_demande = json.STATUT_DEMANDE[adhesion.numero_sequence_statut_demande];
            return adhesion;
        })

        callback(adhesion[0]);
    });
};

const updateAdhesionByNumeroSequence = (datas, callback) => {
    var donnees = [
        datas.numero_sequence,
        datas.type_transaction,
        datas.numero_sequence_statut_demande,
        datas.date_debut,
        datas.date_fin
    ];

    db.query(`update public.adhesion 
                 set (type_transaction, numero_sequence_statut_demande, date_debut, date_fin)
                      =
                     ($2, $3, $4, $5)
               where numero_sequence = $1`, donnees,
        (error, results) => {
            if (error) {
                throw error;
            }
            callback(results.rows);
        });
}


const createAdhesion = (datas, callback) => {
    var donnees = [
        datas.date_debut,
        datas.date_fin,
        datas.montant_paye.trim(),
        datas.date_transaction,
        datas.type_transaction,
        datas.etudiant,
        datas.numero_sequence_membre,
        datas.numero_sequence_type_adhesion,
        datas.numero_sequence_statut_demande,
        datas.commentaire,
        moment(datas.date_debut).format('YYYY') + datas.numero_sequence_type_adhesion + datas.numero_sequence_membre
    ];

    db.query(`insert into public.adhesion 
                     (date_debut, 
                      date_fin, 
                      montant_paye, 
                      date_transaction, 
                      type_transaction, 
                      etudiant, 
                      numero_sequence_membre, 
                      numero_sequence_type_adhesion, 
                      numero_sequence_statut_demande,
                      commentaire, 
                      numero_membre)
              values     
                     ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
              returning numero_sequence`, donnees,
        (error, results) => {
            if (error) {
                throw error;
            }
            callback(results.rows);
        });
};

const deleteAdhesionByNumeroSequence = (id, callback) => {
    db.query(`delete 
                from public.adhesion 
               where numero_sequence = $1`, [id], (error, results) => {
        if (error) {
            throw error;
        }
        callback(results.rows);
    });
};

module.exports = {
    getAdhesionByNumeroSequenceMembre,
    getAdhesionByNumeroSequence,
    createAdhesion,
    deleteAdhesionByNumeroSequence,
    updateAdhesionByNumeroSequence,
};