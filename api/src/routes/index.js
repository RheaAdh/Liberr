import express from 'express';
import example from './example';
import auth from './auth';
import donate from './donate';
import subscription from './subscription';
import profile from './profile';
import shelf from './shelf';

const router = express.Router();

router.use('/example', example);
router.use('/auth', auth);
router.use('/donation', donate);

router.use('/subscription', subscription);
router.use('/profile', profile);
router.use('/shelf', shelf);
export default router;
