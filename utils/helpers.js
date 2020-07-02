var utils = require('./dates.js');

var helpers = {
    //Permet ed définir si la contenue a afficher sera une video ou une image et retourne le template HTML
    definirContenue: function(instaItem){
        if(instaItem.type == "video") {
             return '<video width="100%" controls><source src="'+ instaItem.videos.standard_resolution.url + '" type="video/mp4"></video>'; 
        } else {
            return '<img src="'+ instaItem.images.standard_resolution.url + '" alt="Image instagram" />';
        }
    },
    //Permet d'insérer des bloques de code dans le layout depuis une view
    block: function(name){
        var blocks  = this._blocks;
        var content = blocks && blocks[name];
        return content ? content.join('\n') : null;
    },
    //Permet d'insérer des bloques de code dans le layout depuis une view
    contentFor: function (name, options) {
        var blocks = this._blocks || (this._blocks = {});
        var block  = blocks[name] || (blocks[name] = []);
        block.push(options.fn(this));
    },
    
    //Permet d'obtenir le jour d'un unix_timestamp
    dateDay: function(unix_timestamp){
        var date = new Date(unix_timestamp*1000);
        return date.getDate();
    },
    //Permet d'obtenir le mois d'un unix_timestamp
    dateMonth: function(unix_timestamp){
        var date = new Date(unix_timestamp*1000);
        return utils.GetMonth(date.getMonth())[1];
    },
    //Permet d'obtenir l'année d'un unix_timestamp
    dateYear: function(unix_timestamp){
        var date = new Date(unix_timestamp*1000);
        return date.getFullYear();
    },
    //pick une couleur aléatoirement
    randomColor: function(id, mode) {
        var idSplited = id.split('_');
        var lastChar = idSplited[0].substr(idSplited[0].length -1, 1);
        
        switch (parseInt(lastChar)) {
            case 0: return (mode === 'badge') ? 'color0Badge' : 'color0';
            case 1: return (mode === 'badge') ? 'color1Badge' : 'color1';
            case 2: return (mode === 'badge') ? 'color2Badge' : 'color2';
            case 3: return (mode === 'badge') ? 'color3Badge' : 'color3';
            case 4: return (mode === 'badge') ? 'color4Badge' : 'color4';
            case 5: return (mode === 'badge') ? 'color5Badge' : 'color5';
            case 6: return (mode === 'badge') ? 'color6Badge' : 'color6';
            case 7: return (mode === 'badge') ? 'color7Badge' : 'color7';
            case 8: return (mode === 'badge') ? 'color8Badge' : 'color8';
            case 9: return (mode === 'badge') ? 'color9Badge' : 'color9';
            default: return 'colorDefault';
        }
    }
};


module.exports.helpers = helpers;
