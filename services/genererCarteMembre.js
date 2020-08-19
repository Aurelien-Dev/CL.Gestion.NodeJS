const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

function GenererCarteMembre() {
    const width = 440
    const height = 228

    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    loadImage('./public/img/rectoCarteEte.png').then(image => {
        context.drawImage(image, 0, 0, 440, 228);

        context.font = "bold 17px Arial";
        context.fillText('2020', 220, 70);
        context.fillText('Aurélien Cretaine', 40, 119);
        context.fillText('52147858 ', 140, 150);

        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync('./image.png', buffer)
    })
}

module.exports = { GenererCarteMembre };