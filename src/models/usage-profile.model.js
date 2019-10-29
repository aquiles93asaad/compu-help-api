const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const UsageProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    questions: {
        type: [Schema.Types.ObjectId],
        ref: 'Question'
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


module.exports = mongoose.model('UsageProfile', UsageProfileSchema);
