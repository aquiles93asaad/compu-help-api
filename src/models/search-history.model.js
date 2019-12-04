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
        label: String,
        value: String | Boolean,
        processorMinScore: Number,
        processorMaxScore: Number,
        ramMinScore: Number,
        ramMaxScore: Number,
        storageMinScore: Number,
        storageMaxScore: Number,
        graphicsCardMinScore: Number,
        graphicsCardMaxScore: Number
    }],
}, {
    versionKey: false
});


module.exports = mongoose.model('SearchHistory', SearchHistorySchema);
