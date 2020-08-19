const db = require('../db/baseDB');

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
                     NOW() < adh.date_fin as adh_actif,
                     commentaire
                from public.adhesion adh
          inner join public.type_adhesion tadh
            on adh.numero_sequence_type_adhesion= tadh.numero_sequence
               where adh.numero_sequence_membre = $1
            order by adh.date_debut desc`, [id], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};


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
        datas.commentaire
    ];

    db.query(`insert into public.adhesion 
                     (date_debut, date_fin, montant_paye, date_transaction, type_transaction, etudiant, numero_sequence_membre, numero_sequence_type_adhesion, commentaire)
              values     
                     ($1, $2, $3, $4, $5, $6, $7, $8, $9)
              returning numero_sequence`, donnees,
        (error, results) => {
            if (error) {
                return next(error);
            }
            callback(results.rows);
        });
};


const deleteAdhesionByNumeroSequence = (id, callback) => {
    db.query(`delete 
                from public.adhesion 
               where numero_sequence = $1`, [id], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

module.exports = {
    getAdhesionByNumeroSequenceMembre,
    createAdhesion,
    deleteAdhesionByNumeroSequence
};