var express = require('express');
var router = express.Router();
const donateController  = require('../controllers/donate');
const isLoggedIn = require('../middleware/isLoggedIn');

router.post("/donateBook",isLoggedIn,donateController.donateBook);
router.put("/replaceLostBook",donateController.replaceLostBook);

module.exports = router;