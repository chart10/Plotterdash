import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { validateTest } from './backend/middleware/ValidationMiddleware.js';
const app = express();

// Routers
import taskRouter from './backend/routes/taskRouter.js';
import authRouter from './backend/routes/authRouter.js';
import userRouter from './backend/routes/userRouter.js';

// Middleware
import errorHandlerMiddleware from './backend/middleware/ErrorHandlerMiddleware.js';
import { authenticateUser } from './backend/middleware/AuthMiddleware.js';

app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.post('/api/v1/test', validateTest, (req, res) => {
  const { name } = req.body;
  res.send({ response: `Hello, ${name}` });
});

app.use('/api/v1/tasks', authenticateUser, taskRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', authenticateUser, userRouter);

// 404 NOT FOUND
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

// ERROR MIDDLEWARE
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
