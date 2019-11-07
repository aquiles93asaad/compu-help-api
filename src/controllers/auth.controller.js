const jwt = require('jsonwebtoken');
const config = require('../config/config');
const _ = require('lodash');

module.exports = {
    generateToken
}

function generateToken(user) {
    let userToToken = _.clone(user);
    delete userToToken.image;
    const payload = JSON.stringify(userToToken);
    return jwt.sign(payload, config.jwtSecret);
}
