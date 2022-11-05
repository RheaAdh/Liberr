import express from 'express';
import { exampleRoute } from '../controllers/example';

const router = express.Router();

router.get('/', exampleRoute);

export default router;
