const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

function GenererCarteMembre(infoCarte) {
    const width = 440
    const height = 228

    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')
    var imagePath = './public/img/rectoCarteHiver.png'
    var dateAchat = '';

    switch (infoCarte.type_carte) {
        case 'Annuel':
            imagePath = './public/img/rectoCarteAnnuelle.png'
            dateAchat = infoCarte.date_debut
            break;
        case 'Saisonnier été':
            imagePath = './public/img/rectoCarteEte.png'
            break;
        case 'Saisonnier hiver':
            imagePath = './public/img/rectoCarteHiver.png'
            break;
        case 'Saisonnier automne':
            imagePath = './public/img/rectoCarteAutomne.png'
            break;
        case 'Animateur':
            imagePath = './public/img/rectoCarteAnimateur.png'
            break;
    }

    loadImage(imagePath).then(image => {
        context.drawImage(image, 0, 0, 440, 228);

        context.font = "bold 17px Arial";
        context.fillText(infoCarte.annee_debut, 220, 70);
        context.fillText(infoCarte.nom_prenom, 40, 119);
        context.fillText('52147858 ', 130, 150);

        if (dateAchat != '') {
            context.fillText(dateAchat, 125, 172);
        }

        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync('./image.png', buffer)

        return 'nomFichier';
    })
}

module.exports = { GenererCarteMembre };