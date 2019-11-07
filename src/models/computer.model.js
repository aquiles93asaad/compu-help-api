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
    prices: Number,
    availableAt: {
        type: [String],
    },
    specifications: {
        processor: {
            brand: {
                type: String,
                required: true,
                enum: ['INTEL', 'AMD']
            },
            model: String,
            version: String,
            rate: Number,
            cores: Number,
            cache: Number
        },
        memory: {
            ram: Number,
            ramType: {
                type: String,
                required: true,
                enum: ['DDR2', 'DDR3', 'LPDDR2', 'LPDDR3', 'DDR4', 'DDR5']
            },
            speed: Number,
            expandableRam: Number
        },
        graphicsCard: {
            brand: {
                type: String,
                required: true,
                enum: ['NVIDIA', 'INTEL', 'AMD']
            },
            graphicCardType: {
                type: String,
                required: true,
                enum: ['INTEGRADA', 'DEDICADA']
            },
            processorRate: Number,
            ram: Number,
            ramType: {
                type: String,
                enum: ['DDR3','DDR3','DDR4','DDR5']
            }
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
            storageType: {
                type: String,
                required: true,
                enum: ['HDD', 'SSD']  
            },
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
