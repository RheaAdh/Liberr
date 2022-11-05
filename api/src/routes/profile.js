import express from 'express';
import { getOrders, editAddress } from '../controllers/profile';
import isLoggedIn from '../middleware/isLoggedIn';
const router = express.Router();

router.get('/orders', isLoggedIn, getOrders);
router.post('/editAddress', isLoggedIn, editAddress);

export default router;
