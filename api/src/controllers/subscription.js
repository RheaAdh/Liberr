import { route, HTTPError } from '../utils/utilities';
import Subscription from '../models/Subscription';
import User from '../models/User';
import moment from 'moment';
export const allSubscriptions = async (req, res) => {
  // don't forget to wrap function in route()
  const subscriptions = await Subscription.find();
  return res.send({ success: true, data: subscriptions });
};

export const addSubscription = route(async (req, res) => {
  // don't forget to wrap function in route()
  const { name, price, numberOfMonths, maxBorrowCount, minDonateCount } =
    req.body;

  const subscription = new Subscription(req.body);
  await subscription.save();
  return res.send({ success: true, data: subscription, msg: 'Saved' });
});

export const currentSubscription = route(async (req, res) => {
  // don't forget to wrap function in route()
  const user = await User.find({ email: req.user.email })
    .select('subscriptionType subscriptionEndDate')
    .populate('subscriptionType');
  return res.send({
    success: true,
    msg: user,
  });
});

export const choosePlan = route(async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  if (user.subscriptionEndDate > Date.now()) {
    return res.send({
      success: false,
      msg: 'You already have a subscription',
      // too big for toast ;(
      // moment(user.subscriptionEndDate).format('DD/MM/YYYY'),
    });
  }
  const { subscriptionId, numberOfMonths } = req.body;
  user.subscriptionType = subscriptionId;
  user.subscribedNumberOfMonths = numberOfMonths;
  user.subscriptionEndDate = moment().add(30, 'days').calendar();
  await user.save();

  return res.send({ success: true, msg: 'Saved' });
});
