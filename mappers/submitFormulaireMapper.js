var mapperBody = function(body) {
    return [
        body.Nom,
        body.Prenom,
        body.AdresseCourriel,
        body.Telephone,
        body.AdresseContact,
        body.LienContact,
        body.NomPrenomContact,
        body.TelephoneContact,
        (body.AccepteRisque != undefined ? true : false)
    ];
};



module.exports.formulaire = {
    mapperBody: mapperBody
}