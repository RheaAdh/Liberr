const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
    // Get the token fron header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({
            success: false,
            msg: 'No token found. Please log in again.',
        });
    }

    try {
        const decoded = jwt.verify(token, 'siaogboawpgbe');
        req.user = decoded;
        if (req.user) next();
    } catch (err) {
        res.status(401).json({
            success: false,
            msg: 'Token is not valid. Please log in again.',
        });
    }
};
