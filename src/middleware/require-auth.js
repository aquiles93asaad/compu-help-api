const passport = require('passport');
const _ = require('lodash');

const requireAuthenticationList = [
    'POST /api/computer',
    'PUT /api/computer',
    'DELETE /api/computer',
    
    'POST /api/notificacion',
    'GET /api/notificacion',
    'PUT /api/notificacion',
    'DELETE /api/notificacion',

    'POST /api/question',
    'PUT /api/question',
    'DELETE /api/question',

    'POST /api/usage-profile',
    'PUT /api/usage-profile',
    'DELETE /api/usage-profile',

    'POST /api/user',
    'GET /api/user',
    'PUT /api/user',
    'DELETE /api/user',
];

const requireAuthentication = function(request, response, next) {
    let route = `${request.method} ${request.originalUrl}`;
    
    if (_.indexOf(requireAuthenticationList, route) === -1) {
        next();
    } else {
        passport.authenticate('jwt', { session: false })(request, response, next);
    }
}

module.exports = requireAuthentication;
