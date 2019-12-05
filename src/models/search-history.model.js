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


module.exports = mongoose.model('SearchHistory', SearchHistorySchema);
