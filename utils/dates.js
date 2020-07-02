var month = new Array();
month[0] = ["Janvier", "Jan"];
month[1] = ["Février", "Fév"];
month[2] = ["Mars", "Mar"];
month[3] = ["Avril", "Avr"];
month[4] = ["Mai", "Mai"];
month[5] = ["Juin", "Juin"];
month[6] = ["Juillet", "Juil"];
month[7] = ["Aout", "Aout"];
month[8] = ["Septembre", "Sept"];
month[9] = ["Octobre", "Oct"];
month[10] = ["Novembre", "Nov"];
month[11] = ["Decembre", "Dec"];


module.exports.GetMonth =  function(number){
    return month[number];
};