import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes';
const connectDB = require('./config/db');
import { errorHandler, notFoundHandler } from './utils/utilities';


dotenv.config({ path: '../.env' });

connectDB();

const app = express();

const donateRoute = require('./routes/donate');
const gloalRoute = require('./routes/global');
const bookRoute = require('./routes/book');

app.use(cors());
app.use(express.json({ extended: false }));
app.use('/api', router);
app.use('*', notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
