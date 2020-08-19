$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.membre)) { window.CL.View.membre = {}; }

    var layer = document.getElementById("canvasFond");
    var ctx = layer.getContext("2d");

    var img = new Image(); // Crée un nouvel élément img
    img.src = '/img/rectoCarteAnnuelle.png'; // définit le chemin de la source
    img.addEventListener('load', function() {
        ctx.drawImage(img, 0, 0, 440, 228);

        ctx.font = "bold 17px Arial";
        ctx.fillText('2020', 220, 70);
        ctx.fillText('Aurélien Cretaine', 40, 119);
        ctx.fillText('52147858 ', 140, 150);
    }, false);
}(window, $));