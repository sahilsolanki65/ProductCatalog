const mongoose = require('mongoose');

const ValidationSchema = new mongoose.Schema({
        importId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Imports'
        },
        rowNumber: {
            type: Number,
            required: true,
            min: 0,
        },
        columnName: {
            type: String,
            required: true,
        },
        issueCode: {
            type: String,
            required: true,
        },
        message: {
            type: String,
        },
    },
    {
        timestamps: {
            createdAt: 'createdAt'
        }
    }
);

module.exports = mongoose.model('Validation', ValidationSchema);
