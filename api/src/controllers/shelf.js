import { route, HTTPError } from '../utils/utilities';
import Order from '../models/Order';
import User from '../models/User';
import Book from '../models/Book';
import Copy from '../models/Copy';
var dist = require('geo-distance-js');
const geolib = require('geolib');
import getDistance from 'geolib/es/getDistance';
import Subscription from '../models/Subscription';
export const placeOrder = route(async (req, res) => {
    // don't forget to wrap function in route()

    const user = await User.findOne({ email: req.user.email });
    if (user.blocked.isBlocked) {
        return res.send({
            success: false,
            msg: 'Account blocked due to ' + user.blocked.reason,
        });
    }

    ///chk if subss
    if (!user.subscriptionType) {
        return res.status(400).json({ error: 'not subscribed' });
    }

    //chk duedate of subs before place order
    // if(Date.now>dueDate){
    //     return res.status(400).jeon
    // }

    //chk if u can place order or not because of plan stuff
    let subscriptionId = user.subscriptionType;
    const sub = await Subscription.findOne({ _id: subscriptionId });

    if (user.borrowedCount >= sub.maxBorrowCount) {
        return res.status(400).json({
            success: false,
            error: 'You cannot place an order youve crossed your monthly limit.',
        });
    }
    const { bookId, bookCondition } = req.body;

    //assign nearest copy
    let currentloc = user.location;

    var book = await Book.findOne({ _id: bookId }).populate({
        path: 'copies',
        populate: {
            path: 'presentOwner',
            model: 'User',
        },
    });
    // copiesArr = copiesArr.copies;

    var copiesArr = book.copies;
    console.log('====================================');
    var copies = copiesArr.filter((copy) => {
        return copy.condition == bookCondition;
    });
    console.log('====================================');
    console.log(copies);
    console.log('====================================');
    let closestCopyId = copies[0]._id;
    var x = getDistance(
        {
            latitude: copies[0].presentOwner.location.coordinates[0],
            longitude: copies[0].presentOwner.location.coordinates[1],
        },
        {
            latitude: currentloc.coordinates[0],
            longitude: currentloc.coordinates[1],
        }
    );
    var mnDist = x;
    for (let i = 1; i < copies.length; i++) {
        x = getDistance(
            {
                latitude: copies[i].presentOwner.location.coordinates[0],
                longitude: copies[i].presentOwner.location.coordinates[1],
            },
            {
                latitude: currentloc.coordinates[0],
                longitude: currentloc.coordinates[1],
            }
        );
        // var x = dist.getDistance(
        //     copies[i].presentOwner.location.coordinates[0],
        //     copies[i].presentOwner.location.coordinates[1],
        //     currentloc.coordinates[0],
        //     currentloc.coordinates[1]
        // );
        if (x < mnDist) {
            mnDist = x;
            closestCopyId = copies[i]._id;
        }
    }
    console.log('====================================');
    console.log(closestCopyId);
    console.log('====================================');
    const copy = await Copy.findById(closestCopyId).populate('presentOwner');

    // .populate({
    //     path: 'copies',
    //     populate: {
    //         path: 'presentOwner',
    //         model: 'User',
    //         populate: {
    //             path: 'location',
    //             $near: {
    //                 $maxDistance: 15000000000000000000000000000000000000000000, //Searching in a range of 15 kms
    //                 $geometry: {
    //                     type: 'Point',
    //                     coordinates: [currentloc[0], currentloc[1]],
    //                 },
    //             },
    //         },
    //     },
    // });
    //add copy to orders
    const order = new Order();
    order.fromUser = copy.presentOwner._id;
    order.toUser = user._id;
    order.isbn = copy._id;
    order.deliveryStatus = 'REQUESTED_FOR_BORROW';

    user.orders.push(order._id);
    await user.save();
    copy.isOrdered = true;
    await copy.save();

    //TODO:copy isordered true based on condition and distance
    return res.send({ success: true, data: copy });
});

export const getBorrowed = route(async (req, res) => {
    // don't forget to wrap function in route()

    const user = await User.findOne({ email: req.user.email })
        .populate('borrowed')
        .populate({
            path: 'borrowed',
            model: 'Copy',
            populate: {
                path: 'bookId',
                model: 'Book',
                populate: {
                    path: 'copies',
                    model: 'Copy',
                },
            },
        });

    return res.send({ success: true, data: user });
});

export const getToLend = route(async (req, res) => {
    // don't forget to wrap function in route()

    const user = await User.findOne({ email: req.user.email }).populate({
        path: 'toLend',
        model: 'Copy',
        populate: {
            path: 'bookId',
            model: 'Book',
            populate: {
                path: 'copies',
                model: 'Copy',
            },
        },
    });

    return res.send({ success: true, data: user });
});

export const markAsRead = route(async (req, res) => {
    // don't forget to wrap function in route()
    const copy = await Copy.findById(req.body.copyId);
    if (!copy) return res.status(400).json({ error: 'no copy' });
    copy.readingStatus.isCompleted = true;
    copy.readingStatus.dueDate = null;
    copy.isOrdered = false;
    await copy.save();
    const user = await User.findOne({ email: req.user.email });
    user.toLend.push(copy._id);
    await user.save();
    user.borrowed.remove(copy._id);
    await user.save();
    return res.send({ success: true, data: user });
});

export const getBookFromCopy = route(async (req, res) => {
    // don't forget to wrap function in route()
    const copyId = req.body.copyId;
    const copy = await Copy.findOne({ _id: copyId });
    const book = await Book.findOne({ _id: copy.bookId });
    return res.send({ success: true, data: book });
});
