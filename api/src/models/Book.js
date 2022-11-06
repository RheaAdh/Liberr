const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        authors: [
            {
                type: String,
            },
        ],
        genre: {
            type: String,
        },
        tags: [
            {
                type: String,
            },
        ],
        copies: [
            {
                type: String,
                ref: 'Copy',
            },
        ],
        isAvailable: {
            type: Boolean,
            default: true,
        },
        imageLink: {
            type: String,
            default: 'https://media.istockphoto.com/vectors/stack-of-books-and-open-book-with-red-book-cover-and-white-question-vector-id1256683989?k=20&m=1256683989&s=612x612&w=0&h=7GMvXOULIXJU50TzNKt8ub2sP5s-kpl3RTJh0lRR3Tc=',
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model('Book', bookSchema);
