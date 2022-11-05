const Copy = require('../models/Copy');

exports.receivedBook = async (req, res) => {
    try {
        const copy = await Copy.findOneAndUpdate(
            { _id: req.body.copyId },
            { isBorrowed: true }
        );
        return res.json(copy);
    } catch (err) {
        return res.status(500).json({ err: err.toString() });
    }
};
