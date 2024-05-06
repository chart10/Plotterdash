import { verifyJWT } from '../../utils/tokenUtils.js';
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/CustomError.js';

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('Authentication invalid');
  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

export const authenticateAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new UnauthorizedError(
        'This route is only available to the administrator'
      );
    next();
  };
};
