const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const isLoggedIn = require('../middleware/isLoggedIn');

//Auth user and get token
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email }).lean();

        if (!user) {
            return res
                .status(400)
                .json({ success: false, msg: 'User is not registered.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ success: false, msg: 'Incorrect Password' });
        }

        const payload = {
            ...user,
            password: undefined,
        };
        const token = jwt.sign(payload, 'siaogboawpgbe', {
            expiresIn: '720h',
        });
        res.json(token);
    } catch (err) {
        console.log(`Error : ${err.message}`);
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
});

// Register a user
router.post('/register', async (req, res) => {
    const { name, email, password, address } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res
                .status(400)
                .json({ success: false, msg: 'User already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        user = new User({
            name,
            email,
            address,
            password: hashpassword,
        });

        await user.save();
        res.json({ success: true, msg: 'registered' });
    } catch (err) {
        console.log(`Error : ${err.message}`);
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
});

module.exports = router;
