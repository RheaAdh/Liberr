var axios = require('axios');
var Book = require('../models/Book');
const Copy = require('../models/Copy');
const { copy } = require('../routes/auth');

exports.donateBook = async (req, res) => {
    try {
        console.log(req.body.isbn);
        const bookdata = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=isbn:${req.body.isbn}`
        );

        if (bookdata.data.totalItems != 0) {
            const bookExists = await Book.exists({
                name: bookdata.data.items[0].volumeInfo.title,
            });

            const bookCopy = await Copy.create({
                _id: req.body.isbn,
                presentOwner: req.user,
                isPaperBack: req.body.isPaperBack,
                publisher: bookdata.data.items[0].volumeInfo.publisher,
                condition: req.body.condition,
                imageLink: `https://covers.openlibrary.org/b/isbn/${req.body.isbn}-L.jpg`,
            });

            if (bookExists) {
                const book = await Book.findOne({
                    name: bookdata.data.items[0].volumeInfo.title,
                });
                book.copies.push(req.body.isbn);
                await book.save();
                bookCopy.bookId = book._id;
                await bookCopy.save();
                return res.json({ book: book });
            } else {
                const book = await Book.create({
                    name: bookdata.data.items[0].volumeInfo.title,
                    authors: bookdata.data.items[0].volumeInfo.authors,
                    genre: req.body.genre,
                    tags: req.body.tags,
                    copies: [req.body.isbn],
                    imageLink: `https://covers.openlibrary.org/b/isbn/${req.body.isbn}-L.jpg`,
                });
                bookCopy.bookId = book._id;
                await bookCopy.save();
                return res.json({ book: book });
            }
        } else {
            return res.json({ msg: 'Invalid isbn' });
        }
    } catch (err) {
        res.status(500).json({ err: err.toString() });
    }
};

//isLost:true(for old book) && add new book
exports.replaceLostBook = async (req, res) => {
    try {
        const oldIsbn = req.body.oldIsbn;
        const newIsbn = req.body.newIsbn;
        const oldBook = await Copy.findOneAndUpdate(
            { _id: oldIsbn },
            { isLost: true },
            { new: true }
        );
        if (!oldBook) {
            return res.json({ msg: 'Invalid old isbn' });
        }
        const bookdata = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=isbn:${oldIsbn}`
        );
        if (bookdata) {
            const newCopy = await Copy.create({
                _id: newIsbn,
                presentOwner: req.user,
                isPaperBack: req.body.isPaperBack,
                publisher: bookdata.data.items[0].volumeInfo.publisher,
                condition: req.body.condition,
                imageLink: `https://covers.openlibrary.org/b/isbn/${newIsbn}-L.jpg`,
            });
            const book = await Book.findOneAndUpdate(
                { name: bookdata.data.items[0].volumeInfo.title },
                {
                    $push: { copies: newIsbn },
                },
                { new: true }
            );
            res.json({ book: book });
        } else {
            res.status(400).json({ error: 'Invalid isbn' });
        }
    } catch (err) {
        res.status(500).json({ err: err.toString() });
    }
};
