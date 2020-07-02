var helpers = {
    //Permet d'insérer des bloques de code dans le layout depuis une view
    block: function(name) {
        var blocks = this._blocks;
        var content = blocks && blocks[name];
        return content ? content.join('\n') : null;
    },
    //Permet d'insérer des bloques de code dans le layout depuis une view
    contentFor: function(name, options) {
        var blocks = this._blocks || (this._blocks = {});
        var block = blocks[name] || (blocks[name] = []);
        block.push(options.fn(this));
    },
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