//Regroupe l'enssemble des utilitaires dans un module 
var utilitaires = {
    EnumToList: function(jsonEnum) {
        var list = [];

        for (var i in jsonEnum) {
            list.push({ code: i, libelle: jsonEnum[i] });
        }

        return list;
    }
}


module.exports = utilitaires