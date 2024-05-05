import { verifyJWT } from '../../utils/tokenUtils.js';
import { UnauthenticatedError } from '../errors/CustomError.js';

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('Authentication invalid');
  try {
    const user = verifyJWT(token);
    console.log(user);
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError('Authentication invalid');
  }
};
