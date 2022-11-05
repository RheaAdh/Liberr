const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const isLoggedIn = require('../middleware/isLoggedIn');

//Auth user and get token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email }).lean();

        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect Password' });
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
        res.status(500).json({ error: 'Server Error' });
    }
});

// Register a user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }
        console.log(user);
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashpassword,
        });
        console.log(user, 'user2');
        await user.save();
        console.log(user);
        res.status(200).json({ message: 'Registered successfully!' });
    } catch (err) {
        console.log(`Error : ${err}`);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
