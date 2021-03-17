const db = require('./baseDB');
const membreDB = require('./membreDB');

//Vérifie si le login du membre est valide et retourne le membre
const isValidMember = (email, passwd, callback) => {
    db.query(`select numero_sequence from public.membre m 
               where m.adresse_courriel  = $1
                 and m.passhash  = $2`, [email, passwd], (error, results) => {
        if (error) {
            throw error;
        }

        if (results.rows.length === 1) {
            membreDB.getMembreByNumeroSequence(results.rows[0].numero_sequence, (membre) => {
                callback(membre);
            })
        } else {
            callback(null);
        }
    });
};



module.exports = {
    isValidMember
};