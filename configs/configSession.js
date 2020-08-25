const session = require('express-session');
const cookieParser = require('cookie-parser');

function ConrigurationSession(app) {
    app.use(cookieParser());

    app.set('trust proxy', 1); // trust first proxy

    app.use(session({ secret: "Shh, its a secret!" }));
}

module.exports = { config: ConrigurationSession };