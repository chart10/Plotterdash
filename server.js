import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

const app = express();

// Routers
import taskRouter from './backend/routes/taskRouter.js';

// Middleware
import errorHandlerMiddleware from './backend/middleware/ErrorHandlerMiddleware.js';

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.post('/', (req, res) => {
  console.log('fetching data');
  res.send({ response: 'data received', data: req.body });
});

app.use('/api/v1/tasks', taskRouter);

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
