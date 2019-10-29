const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const SearchHistorySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    usageProfiles: {
        type: [Schema.Types.ObjectId],
        ref: 'UsageProfile'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    answers: [{
        question: {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        },
        value: {
            type: String
        }
    }],
}, {
    versionKey: false
});


module.exports = mongoose.model('SearchHistory', SearchHistorySchema);
