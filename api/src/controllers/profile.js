import { route, HTTPError } from '../utils/utilities';
import Order from '../models/Order';
import User from '../models/User';

export const getOrders = route(async (req, res) => {
    // don't forget to wrap function in route()
    const user = await (await User.findOne({ email: req.user.email }))
        .select('orders')
        .populate('orders');
    return res.send({ success: true, data: user });
});

export async function editAddress(req, res) {
    try {
        let { address } = req.body;
        let user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.send({ success: false, msg: 'User doesnt exist' });
        }
        user.address = address;
        user.save();
        return res.send({
            success: true,
            msg: 'Updated address',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ success: false, msg: 'Server Error' });
    }
}
