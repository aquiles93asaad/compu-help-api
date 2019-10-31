const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const UsageProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    description: {
        type: String
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
    versionKey: false,
    toJSON: { virtuals: true }
});

UsageProfileSchema.virtual('questions', {
    ref: 'Question',
    localField: 'name',
    foreignField: 'usageProfiles',
    justOne: false
})


module.exports = mongoose.model('UsageProfile', UsageProfileSchema);
