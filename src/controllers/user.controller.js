const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const _ = require('lodash');

async function check(userEmail, userDocId) {
    try {
        let filters = {};
        if(typeof userDocId !== 'undefined') {
            filters = {
                $or: [
                    { email: userEmail },
                    { dni: userDocId }
                ]
            }
        } else {
            filters =  { email: userEmail };
        }

        const user = await User.findOne(filters);
        if(user) {
            return true;
        } else {
            return false;
        }
    } catch(error) {
        console.log(error);
        return error;
    }
}

async function create(user) {
    try {
        if(!user.password)
            user['password'] = 'compuhelp';
        
        user.hashedPassword = bcrypt.hashSync(user.password, 10);
        delete user.password;
        const createdUser = await User(user).save();
        return createdUser;
    } catch(error) {
        console.log(error);
        return error;
    }
}

async function get(reqUser, filters) {
    try {
        if(typeof filters === 'undefined') {
            filters = {};
        }

        const users = await User.find(
            filters,
            '-hashedPassword'
        );
        return users;
    } catch(error) {
        console.log(error);
        return error;
    }
}

async function update(userData) {
    try {
        let user = await User.findById(userData._id);

        if(userData.password && userData.oldPassword) {
            if (!bcrypt.compareSync(userData.password, user.hashedPassword)) {
                return null;
            }

            userData.hashedPassword = bcrypt.hashSync(userData.password, 10);
        }

        user = await User.findOneAndUpdate(
            { _id: userData._id },
            userData,
            { new: true },
        );

        if (user) {
            user.toObject();
            delete user.hashedPassword;
        }
        return user;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function setFavourites(idUser, computersIds) {
    try {
        const data = { favouriteComputers: computersIds };
        let user = await User.findOneAndUpdate(
            { _id: idUser },
            data,
            { new: true },
        );
        return user;
    } catch(error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    check,
    create,
    get,
    update,
    setFavourites,
};
