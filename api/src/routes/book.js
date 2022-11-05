var express = require('express');
var router = express.Router();
const bookController = require('../controllers/book');

router.get('/availableBooks', bookController.availableBooks);
router.post('/addToWishlist', bookController.addToWishlist);
router.get('/searchBooks', bookController.searchBooks);

module.exports = router;
