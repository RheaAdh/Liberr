const mongoose = require('mongoose');

const copySchema = new mongoose.Schema(
    {
        _id: {
            //isbn
            type: String,
            unique: true,
        },
        condition: {
            type: String,
            enum: ['VERY GOOD', 'GOOD', 'BAD', 'VERY_BAD'],
        },
        imageLink:{
            type:String,
            default:""
        },
        presentOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        isPaperBack: {
            type: Boolean,
            default: false,
        },
        publisher: {
            type: String,
        },
        isOrdered: {
            type: Boolean,
            default: false,
        },
        isBorrowed: {
            type: Boolean,
            default: false,
        },
        isLost: {
            type: Boolean,
            default: false,
        },
        readingStatus: {
            isCompleted: {
                type: Boolean,
                default: false,
            },
            dueDate: {
                type: Date,
            },
        },
    },
    { timestamps: true, _id: false }
);
module.exports = mongoose.model('Copy', copySchema);
