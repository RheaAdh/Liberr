import { route, HTTPError } from '../utils/utilities';
import Order from '../models/Order';
import User from '../models/User';
import Book from '../models/Book';
import Copy from '../models/Copy';

export const placeOrder = route(async (req, res) => {
    // don't forget to wrap function in route()

    const user = await User.findOne({ email: req.user.email });
    if (user.blocked.isBlocked) {
        return res.send({
            success: false,
            msg: 'Account blocked due to ' + user.blocked.isBlocked.reason,
        });
    }
    //assign nearest copy
    let currentloc = user.location;

    const bookId = req.body.bookId;
    const copies = await Book.find({
        _id: bookId,
    }).populate({
        path: 'copies',
        populate: {
            path: 'presentOwner',
            model: 'User',
            populate: {
                path: 'location',
                match: {
                    $near: {
                        $maxDistance: 15000000000000000000000000000000000000000000, //Searching in a range of 15 kms
                        $geometry: {
                            type: 'Point',
                            coordinates: [currentloc[0], currentloc[1]],
                        },
                    },
                },
            },
        },
    });
    console.log('====================================');
    console.log(copies);
    console.log('====================================');

    return res.send({ success: true, data: copies });
});
