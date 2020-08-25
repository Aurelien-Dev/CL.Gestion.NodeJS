const session = require('express-session');
const cookieParser = require('cookie-parser');

/**
 * Méthode de configuration pour l'utilisation des cookies
 * Il reste de la configuration a pofiner
 * @param {Object} app Application web
 */
function ConrigurationSession(app) {
    app.use(cookieParser());

    app.set('trust proxy', 1); // si l'application Node est derrière un proxy (comme Nginx), nous devrons définir le proxy sur true

    app.use(session({
        secret: "Shh, its a secret!",
        resave: true,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            sameSite: true,
            maxAge: 24 * 60 * 60 * 100 // Time is in miliseconds
        }
    }));
}

module.exports = { config: ConrigurationSession };