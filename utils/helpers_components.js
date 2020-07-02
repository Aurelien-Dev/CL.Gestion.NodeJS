var helpers = {
    //Permet ed définir si la contenue a afficher sera une video ou une image et retourne le template HTML
    InputText: function() {
        return '<div class="form-group row">' +
            '    <label for="Nom" class="col-sm-3 col-form-label champ">' +
            '    Nom *' +
            '    </label>' +
            '    <div class="col-sm-9">' +
            '        <input class="form-control form-control-sm" placeholder="Nom" type="text" value="" >' +
            '    </div>' +
            '</div>';
    }
};


module.exports.helpersComponent = helpers;