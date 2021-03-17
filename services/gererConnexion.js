function gererMembre(request, response, next) {
    var url = 'http://' + request.headers.host + '/login';
    var isConnected = request.session.connecte;


    if (!isConnected) {
        response.redirect(301, url)
    } else {
        next();
    }
}

function gererAdmin(request, response, next) {
    var url = 'http://' + request.headers.host + '/login';
    var isConnected = request.session.connecte;

    if (!isConnected) {
        response.redirect(301, url)
    } else {

        var userConnected = request.session.userConnected;

        if (userConnected.role !== null && userConnected.role !== '')
            next();
        else
            response.redirect(301, url)
    }

}


module.exports = {
    gererMembre,
    gererAdmin
};