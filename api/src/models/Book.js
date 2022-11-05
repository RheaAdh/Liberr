const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        tags: [
            {
                type: String,
            },
        ],
        copies: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Copy',
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model('Book', bookSchema);
