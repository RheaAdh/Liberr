const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            houseNumber: {
                type: String,
            },
            streetName: {
                type: String,
            },
            locality: {
                type: String,
            },
            city: {
                type: String,
            },
            pin: {
                type: String,
            },
            state: {
                type: String,
            },
            country: {
                type: String,
            },
            // location: {
            //     latitude: {
            //         type: String,
            //     },
            //     longitude: {
            //         type: String,
            //     },
            // },
        },
        subscriptionType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subscription',
        },
        subscriptionEndDate: {
            type: Date,
            default: null,
        },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
            },
        ],
        donationPoints: {
            type: Number,
            default: 1,
        },
        borrowedCount: {
            type: Number,
            default: 0,
        },
        borrowed: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Copy',
            },
        ],
        toLend: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Copy',
            },
        ],
        donated: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Copy',
            },
        ],
        blocked: {
            isBlocked: {
                type: Boolean,
                blockedDate: Date,
                reason: {
                    type: String,
                    enum: ['BOOK_LOST', 'BOOK_NOT_DONATED', 'OTHER'],
                },
            },
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model('User', userSchema);
