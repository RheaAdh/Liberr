import express from 'express';
import {
    placeOrder,
    getBorrowed,
    getToLend,
    markAsRead,
    getBookFromCopy,
} from '../controllers/shelf';
import isLoggedIn from '../middleware/isLoggedIn';
const router = express.Router();

router.post('/placeOrder', isLoggedIn, placeOrder);
router.get('/getBorrowed', isLoggedIn, getBorrowed);
router.get('/getToLend', isLoggedIn, getToLend);
router.post('/markAsRead', isLoggedIn, markAsRead);
router.get('/getBookFromCopy', isLoggedIn, getBookFromCopy);

export default router;
