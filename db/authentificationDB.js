const db = require('./baseDB');

//Vérifie si le login du membre est valide et retourne le membre
const isValidMember = (email, passwd, callback) => {
    db.query(`select * from public.membre m 
               where m.adresse_courriel  = $1
                 and m.passhash  = $2`, [email, passwd], (error, results) => {
        if (error) {
            throw error;
        }

        callback(results.rows[0]);
    });
};



module.exports = {
    isValidMember
};