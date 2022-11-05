var express = require('express');
var router = express.Router();
const globalController = require('../controllers/global');
const isLoggedIn = require('../middleware/isLoggedIn');

router.put("/receivedBook",isLoggedIn,globalController.receivedBook);
router.put("/reportLost",isLoggedIn,globalController.reportLost);

module.exports = router;