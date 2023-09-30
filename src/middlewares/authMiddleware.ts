import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../exceptions/customError';
import { verifyAccessToken } from '../utils/verifyTokens';
export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeaders = req.headers.authorization;
  if (!authorizationHeaders) {
    return new CustomError(400, 'Пользователь не авторизован');
  }
  const accessToken = authorizationHeaders.split(' ')[1];
  if (!accessToken) {
    return next(new CustomError(400, 'Пользователь не авторизован'));
  }
  const tokenDetails = await verifyAccessToken(accessToken);
  if (tokenDetails.error) {
    return next(new CustomError(400, 'Пользователь не авторизован'));
  }
  res.status(403).json(tokenDetails);
  next();
};
