var express = require('express');
var router = express.Router();
const globalController = require('../controllers/global');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get("/mySubscription",isLoggedIn,globalController.mySubscription);
router.post("/createBook",globalController.createBook);

module.exports = router;