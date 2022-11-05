import express from 'express';
import { placeOrder } from '../controllers/shelf';
import isLoggedIn from '../middleware/isLoggedIn';
const router = express.Router();

router.post('/placeOrder', isLoggedIn, placeOrder);

export default router;
