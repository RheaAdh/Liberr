import { route, HTTPError } from '../utils/utilities';
import Subscription from '../models/Subscription';

export const allSubscriptions = route(async (req, res) => {
    // don't forget to wrap function in route()
    const subscriptions = await Subscription.find();
    return res.send({ success: true, data: subscriptions });
});

export const addSubscription = route(async (req, res) => {
    // don't forget to wrap function in route()
    const { name, price, numberOfMonths, maxBorrowCount, minDonateCount } =
        req.body;
    const subscription = new Subscription({
        name,
        price,
        numberOfMonths,
        maxBorrowCount,
        minDonateCount,
    });
    await subscription.save();
    return res.send({ success: true, data: subscription, msg: 'Saved' });
});
