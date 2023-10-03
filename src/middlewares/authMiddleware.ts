import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../exceptions/customError';
import { verifyAccessToken } from '../utils/verifyTokens';
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeaders = req.headers.authorization;
  if (!authorizationHeaders) {
    return next(new CustomError(401, 'Пользователь не авторизован'));
  }
  const accessToken = authorizationHeaders.split(' ')[1];
  if (!accessToken) {
    return next(new CustomError(401, 'Пользователь не авторизован'));
  }
  const tokenDetails = await verifyAccessToken(accessToken);
  if (tokenDetails.error) {
    return next(new CustomError(401, 'Пользователь не авторизован'));
  }
  next();
};
