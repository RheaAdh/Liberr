const mongoose = require('mongoose');

const copySchema = new mongoose.Schema(
    {
        _id: {
            //isbn
            type: String,
            unique: true,
        },
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
        condition: {
            type: String,
            enum: ['VERY GOOD', 'GOOD', 'BAD', 'VERY BAD'],
        },
        imageLink: {
            type: String,
            default: 'https://media.istockphoto.com/vectors/stack-of-books-and-open-book-with-red-book-cover-and-white-question-vector-id1256683989?k=20&m=1256683989&s=612x612&w=0&h=7GMvXOULIXJU50TzNKt8ub2sP5s-kpl3RTJh0lRR3Tc=',
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
