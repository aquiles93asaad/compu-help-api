const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const ComputerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date
    },
    computerType: {
        type: String,
        required: true,
        enum: ['PC', 'NOTEBOOK']
    },
    prices: [{
        price: Number,
        availableAt: String
    }],
    specifications: {
        processor: {
            brand: String,
            model: String,
            version: String,
            rate: Number
        },
        memory: {
            ram: Number,
            expandableRam: Number,
        },
        graphicsCard: {
            processor: String,
            memory: Number,
        },
        connectivity: {
            wifi: Boolean,
            bluetooth: Boolean,
            usb2Ports: Number,
            usb3Ports: Number,
            usbCPorts: Number,
            ethernetPort: Boolean,
            hdmiPort: Boolean,
            hdmiMiniPort: Boolean,
            vgaPort: Boolean,
            microphone: Boolean,
        },
        battery: {
            duration: Number,
            restDuration: Number,
            isExpandible: Boolean
        },
        dimensions: {
            width: Number,
            height: Number,
            depth: Number,
            weight: Number,
        },
        storage: {
            space: Number,
            storageType: String
        },
        operatingSystem: String,
    },
    scores: {
        processorMinScore: Number,
        processorMaxScore: Number,
        ramMinScore: Number,
        ramMaxScore: Number,
        storageMinScore: Number,
        storageMaxScore: Number,
        graphicsCardMinScore: Number,
        graphicsCardMaxScore: Number,
        batteryMinScore: Number,
        batteryMaxScore: Number
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


module.exports = mongoose.model('Computer', ComputerSchema);
