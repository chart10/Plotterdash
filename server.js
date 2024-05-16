import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
const app = express();

// Routers
import taskRouter from './backend/routes/taskRouter.js';
import authRouter from './backend/routes/authRouter.js';
import userRouter from './backend/routes/userRouter.js';

// Public Directory
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
import errorHandlerMiddleware from './backend/middleware/ErrorHandlerMiddleware.js';
import { authenticateUser } from './backend/middleware/AuthMiddleware.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(path.resolve(__dirname, './public')));
app.use(cookieParser());
app.use(express.json());

// Dummy Route
app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});

app.use('/api/v1/tasks', authenticateUser, taskRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', authenticateUser, userRouter);

// 404 Not Found
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

// Error Middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(5100, () => {
    console.log(`Server running on port ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
