const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        fromUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        toUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        isbn: {
            type: 'String',
            ref: 'Copy',
        },
        arrivalDate: {
            type: Date,
        },
        deliveryStatus: {
            type: String,
            enum: [
                'REQUESTED_FOR_BORROW',
                'COLLECTED_FROM_LENDER',
                'OUT_FOR_DELIVERY',
                'DELIVERED_TO_BORROWER',
                'CANCEL_BORROW',
            ],
            default: 'REQUESTED_FOR_BORROW',
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model('Order', orderSchema);
