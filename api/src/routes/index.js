import express from 'express';
import example from './example';
import auth from './auth';
import donate from './donate';

const router = express.Router();

router.use('/example', example);
router.use('/auth', auth);
router.use('/d',donate);


export default router;
