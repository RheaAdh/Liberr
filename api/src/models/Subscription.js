const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        maxBorrowCount: Number,
        plans: [
            {
                numberOfMonths: Number,
                price: Number,
            },
        ],
    },
    { timestamps: true }
);
module.exports = mongoose.model('Subscription', subscriptionSchema);
