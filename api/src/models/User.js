const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');
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
            type: String,
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
            },
            coordinates: {
                type: [Number],
                index: '2dsphere',
            },
            formattedAddress: String,
            city: {
                type: String,
            },
        },
        subscriptionType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subscription',
            default: null,
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

userSchema.index({ location: '2dsphere' });

//GeoCoder create Location
userSchema.pre('save', async function (next) {
    if (!this.address) return;
    const loc = await geocoder.geocode(this.address);
    // console.log(loc)
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        city: loc[0].city,
    };

    //Not saving user entered address rather storing formatted address
    // this.address = undefined;
    next();
});
module.exports = mongoose.model('User', userSchema);
