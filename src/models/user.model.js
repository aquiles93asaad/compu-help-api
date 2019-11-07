const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
    },
    hashedPassword: {
        type: String,
        required: true
    },
    esAdmin: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
    },
    favouriteComputers: {
        type: [Schema.Types.ObjectId],
        ref: 'Computer'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    modifiedAt: {
        type: Date
    }
}, {
        versionKey: false
    });


module.exports = mongoose.model('User', UserSchema);
