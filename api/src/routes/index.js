import express from 'express';
import example from './example';
import auth from './auth';
import donate from './donate';
import subscription from './subscription';
import book from './book';

const router = express.Router();

router.use('/example', example);
router.use('/auth', auth);
router.use('/donation',donate);
router.use('/books',book);

router.use('/subscription', subscription);

export default router;
