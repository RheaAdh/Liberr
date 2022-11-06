const Copy = require('../models/Copy');
const Order = require('../models/Order');
const User = require('../models/User');
exports.receivedBook = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.user.email,
        });
        if (user.borrowed.includes(req.body.copyId)) {
            return res.status(400).json({ error: 'book already borrowed' });
        }
        const order = await Order.findOne({
            isbn: req.body.copyId,
            toUser: req.user._id,
        });
        order.deliveryStatus = 'DELIVERED_TO_BORROWER';
        await order.save();
        const copy = await Copy.findOneAndUpdate(
            { _id: req.body.copyId },
            { isBorrowed: true }
        );
        //add to borrow array

        user.borrowed.push(req.body.copyId);
        user.borrowedCount += 1;
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
