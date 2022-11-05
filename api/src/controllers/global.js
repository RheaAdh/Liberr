const Copy = require('../models/Copy');
const User = require('../models/User');
exports.receivedBook = async (req, res) => {
    try {
        const copy = await Copy.findOneAndUpdate(
            { _id: req.body.copyId },
            { isBorrowed: true }
        );
        //add to borrow array
        const user = await User.findOne({
            email: req.user.email,
        });
        user.borrowed.push(req.body.copyId);
        await user.save();
        return res.json(copy);
    } catch (err) {
        return res.status(500).json({ err: err.toString() });
    }
};

exports.reportLost = async (req, res) => {
    try {
        const lostCopy = await Copy.findOneAndUpdate(
            { _id: req.body.copyId },
            { isLost: true },
            { new: true }
        );
        const user = await User.findOneAndUpdate(
            { _id: req.user },
            {
                blocked: {
                    isBlocked: true,
                    reason: 'BOOK_LOST',
                },
            },
            { new: true }
        );
        return res.json({ lostCopy: lostCopy, user: user });
    } catch (err) {
        return res.status(500).json({ err: err.toString() });
    }
};
