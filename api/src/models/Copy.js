const mongoose = require('mongoose');

const copySchema = new mongoose.Schema(
    {
        //_id:isbn
        presentOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        bindType: {
            type: String,
        },
        publisher: {
            type: String,
        },
        isBorrowed: {
            type: Boolean,
            default: 'false',
        },
        isLost: {
            type: Boolean,
            default: 'false',
        },
        readingStatus: {
            isCompleted: {
                type: Boolean,
                default: 'false',
            },
            dueDate: {
                type: Date,
            },
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model('Copy', copySchema);
