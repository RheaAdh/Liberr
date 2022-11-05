import express from 'express';
import { allSubscriptions, addSubscription } from '../controllers/subscription';

const router = express.Router();

router.get('/', allSubscriptions);
router.post('/', addSubscription);

export default router;
