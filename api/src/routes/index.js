import express from 'express';
import example from './example';
import auth from './auth';

const router = express.Router();

router.use('/example', example);
router.use('/auth', auth);

export default router;
