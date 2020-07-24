var mapperBody = function(body) {
    return {
        nom: body.Nom,
        prenom: body.Prenom,
        adresseCourriel: body.AdresseCourriel,
        telephone: body.Telephone,
        NumeroMembre: body.NumeroMembre,

        adresseContact: body.AdresseContact,
        lienContact: body.LienContact,
        nomPrenomContact: body.NomPrenomContact,
        telephoneContact: body.TelephoneContact,

        accepteRisque: (body.AccepteRisque != undefined ? true : false)
    };
};



module.exports.formulaire = {
    mapperBody: mapperBody
}