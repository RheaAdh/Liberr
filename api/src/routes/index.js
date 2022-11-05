import express from 'express';
import example from './example';
import auth from './auth';
import subscription from './subscription';

const router = express.Router();

router.use('/example', example);
router.use('/auth', auth);
router.use('/subscription', subscription);

export default router;
