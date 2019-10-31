const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const QuestionSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    questionType: {
        type: String,
        required: true,
    },
    answers: [{
        label: String,
        value: String | Boolean,
        procesorScore: Number,
        ramScore: Number,
        storageScore: Number,
        graphicsCardScore: Number,
        batteryScore: Number,
    }],
    usageProfiles: {
        type: [String]
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


module.exports = mongoose.model('Question', QuestionSchema);
