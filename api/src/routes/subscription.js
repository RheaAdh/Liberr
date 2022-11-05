import express from 'express';
import {
    allSubscriptions,
    addSubscription,
    currentSubscription,
    choosePlan,
} from '../controllers/subscription';
import isLoggedIn from '../middleware/isLoggedIn';
const router = express.Router();

router.get('/', allSubscriptions);
router.post('/', addSubscription);
router.get('/currentSubscription', isLoggedIn, currentSubscription);
router.post('/choosePlan', isLoggedIn, choosePlan);
// TODO: cron run set plan_end_date for users to null if enddate approaches
export default router;
