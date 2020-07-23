const Handlebars = require('handlebars');

//Permet d'insérer des bloques de code dans le layout depuis une view
Handlebars.registerHelper('block', function(name) {
    var blocks = this._blocks;
    var content = blocks && blocks[name];
    return content ? content.join('\n') : null;
});

//Permet d'insérer des bloques de code dans le layout depuis une view
Handlebars.registerHelper('contentFor', function(name, options) {
    var blocks = this._blocks || (this._blocks = {});
    var block = blocks[name] || (blocks[name] = []);
    block.push(options.fn(this));
});