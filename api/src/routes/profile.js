import express from 'express';
import { getOrders } from '../controllers/profile';
import isLoggedIn from '../middleware/isLoggedIn';
const router = express.Router();

router.get('/orders', isLoggedIn, getOrders);

export default router;
