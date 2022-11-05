const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            
        },
        authors: [{
            type: String,
        }],
        genre: {
            type: String,
            
        },
        tags: [
            {
                type: String,
            },
        ],
        copies: [{
            type: String,
            ref: 'Copy',
        }],
        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);
module.exports  = mongoose.model('Book', bookSchema);
