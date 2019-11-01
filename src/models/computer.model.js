const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const ComputerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
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
            rate: Number,
            cores: Number,
            cache: Number
        },
        memory: {
            ram: Number,
            type: String,
            speed: Number,
            expandableRam: Number
        },
        graphicsCard: {
            processorRate: Number,
            ram: Number,
            ramType: String,
            brand: String
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
            webCam: Boolean
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
            weight: Number
        },
        storage: {
            space: Number,
            storageType: String,
            speed: Number
        },
        operatingSystem: String
    },
    scores: {
        processorScore: Number,
        ramScore: Number,
        storageScore: Number,
        graphicsCardScore: Number
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
