import { UnauthenticatedError } from '../errors/CustomError.js';

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('Authentication invalid');
  next();
};
