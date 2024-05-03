import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const StatusCode = err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || 'Something went wrong in the back end';
  res.status(StatusCode).json({ msg });
};

export default errorHandlerMiddleware;
