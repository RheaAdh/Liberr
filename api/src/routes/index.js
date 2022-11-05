import express from 'express';
import example from './example';
import auth from './auth';
import donate from './donate';
import subscription from './subscription';
import book from './book';
import profile from './profile';
import shelf from './shelf';
import global from './global';

const router = express.Router();

router.use('/example', example);
router.use('/auth', auth);
router.use('/books',book);
router.use('/donation', donate);
router.use('/global',global);
router.use('/subscription', subscription);
router.use('/profile', profile);
router.use('/shelf', shelf);

export default router;
