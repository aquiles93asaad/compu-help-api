const passport = require('passport');
const _ = require('lodash');

const requireAuthenticationList = [
    'POST /api/computer',
    'PUT /api/computer',
    'DELETE /api/computer',
    'POST /api/addComment',
    
    'GET /api/search-history/user-search-history',
    'DELETE /api/search-history',

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
    'POST /api/user/setFavourites',
];

const requireAuthentication = function(request, response, next) {
    let route = `${request.method} ${request.originalUrl}`;

    if (_.indexOf(requireAuthenticationList, route) === -1) {
        console.log('no paso');
        next();
    } else {
        console.log('paso');
        passport.authenticate('jwt', { session: false })(request, response, next);
    }
}

module.exports = requireAuthentication;
