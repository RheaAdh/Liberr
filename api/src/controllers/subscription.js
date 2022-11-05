import { route, HTTPError } from '../utils/utilities';
import Subscription from '../models/Subscription';
import User from '../models/User';
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

export const currentSubscription = route(async (req, res) => {
    // don't forget to wrap function in route()

    return res.send({
        success: true,
        data: req.user.subscriptionType,
        msg: 'Saved',
    });
});

export const choosePlan = route(async (req, res) => {
    // don't forget to wrap function in route()
    //if already has a plan show that and its due date
    // if (req.user.subscriptionEndDate > Date.now()) {
    //     throw Error(
    //         'Already subscribed, please try again on',
    //         req.user.subscriptionEndDate
    //     );
    // }

    const user = await User.findOne({ email: req.user.email });
    const { subscriptionId } = req.body;
    user.subscriptionType = subscriptionId;
    user.save();
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    return res.send({ success: true, msg: 'Saved' });
});
