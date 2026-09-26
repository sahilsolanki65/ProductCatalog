const mongoose = require('mongoose');

const ImportsSchema = new mongoose.Schema({
        accountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        catalogName: {
            type: String,
            required: true,
            trim: true
        },
        sourceFormat: {
            type: String,
        },
        status: {
            type: String,
            enum : ['uploaded','validating','accepted','rejected'],
            allowNull: true,
        },
        sourceFile: {
            type: String,
        },
        totalRows: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        validRows: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        invalidRows: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        startedAt: Date,
        completedAt: Date,
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

module.exports = mongoose.model('Imports', ImportsSchema);
