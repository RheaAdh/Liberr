import { route, HTTPError } from '../utils/utilities';
import Order from '../models/Order';
import User from '../models/User';
import Book from '../models/Book';

export const placeOrder = route(async (req, res) => {
    // don't forget to wrap function in route()

    const user = await await User.findOne({ email: req.user.email });
    if (user.blocked.isBlocked) {
        return res.send({
            success: false,
            msg: 'Account blocked due to ' + user.blocked.isBlocked.reason,
        });
    }
    //assign nearest copy

    const bookId = req.body.copyId;
    const book = await (await Book.findById(bookId)).populated('copies');
    const copies = book.copies;
    // const nearestCopy = await
    return res.send({ success: true, data: user });
});
