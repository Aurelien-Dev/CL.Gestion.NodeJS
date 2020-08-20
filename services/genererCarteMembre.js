const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

function GenererCarteMembre(infoCarte, callback) {
    const width = 440
    const height = 228

    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')
    var dateAchat = '';
    var fileName = infoCarte.nom_prenom + '.png';

    if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName);
    }

    if (infoCarte.type_carte === 'Annuelle') {
        dateAchat = infoCarte.date_debut;
    }

    loadImage(infoCarte.url_carte).then(image => {
        context.drawImage(image, 0, 0, 440, 228);

        context.font = "bold 17px Arial";
        context.fillText(infoCarte.annee_debut, 220, 70);
        context.fillText(infoCarte.nom_prenom, 40, 119);
        context.fillText(infoCarte.numero_membre, 130, 150);

        if (dateAchat != '') {
            context.fillText(dateAchat, 125, 172);
        }
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync('./cartes/' + fileName, buffer)

        callback(fileName);
    })
}

module.exports = { GenererCarteMembre };