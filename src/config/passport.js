const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const config = require('./config');

const localLogin = new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    let user = await User.findOne({ email }, 'name lastName email hashedPassword image esAdmin');
    if (!user) {
        return done(null, null, { errorMessage: "User o email inexistente", errorType: 'invalid-user' });
    }

    if (!bcrypt.compareSync(password, user.hashedPassword)) {
        return done(null, null, { errorMessage: "Contraseña incorrecta", errorType: 'invalid-password' });
    }

    user = user.toObject();
    delete user.hashedPassword;
    done(null, user);
});

const jwtLogin = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}, async (payload, done) => {
    let user = await User.findById(payload._id, 'name lastName email image esAdmin');

    if (!user) {
        return done(null, false, { errorMessage: "Token inválido", errorType: 'invalid-token' });
    }

    user = user.toObject();
    done(null, user);
});

passport.use(jwtLogin);
passport.use(localLogin);

module.exports = passport;
