import express from 'express';
import example from './example';
import auth from './auth';
import subscription from './subscription';
import profile from './profile';

const router = express.Router();

router.use('/example', example);
router.use('/auth', auth);
router.use('/subscription', subscription);
router.use('/profile', profile);

export default router;
