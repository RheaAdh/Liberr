import { route, HTTPError } from '../utils/utilities';
import Order from '../models/Order';
import User from '../models/User';

export const placeOrder = route(async (req, res) => {
    // don't forget to wrap function in route()

    if()
    const user = await (await User.findOne({ email: req.user.email }))
        .select('orders')
        .populate('orders');
    return res.send({ success: true, data: user });
});
