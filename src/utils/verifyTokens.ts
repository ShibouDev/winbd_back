//lib
import jwt from 'jsonwebtoken';

//model
import { UserTokenModel } from '../models/userToken.model';

//config
import configServer from '../config/server';

interface IVerifyToken {
  _id: string;
  iat: number;
  exp: number;
}

export const verifyRefreshToken = async (refreshToken: string) => {
  try {
    const privateKey = configServer.jwtRefreshSecret;

    const token = await UserTokenModel.findOne({ token: refreshToken });
    if (!token) {
      return { error: true, message: 'Invalid refresh token' };
    }
    const verifyToken = (await jwt.verify(
      refreshToken,
      privateKey,
    )) as IVerifyToken;
    return {
      tokenDetails: verifyToken,
      error: false,
      message: 'Valid refresh token',
    };
  } catch (error) {
    return {
      error: true,
      message: 'Invalid refresh token',
    };
  }
};

export const verifyAccessToken = async (accessToken: string) => {
  try {
    const privateKey = configServer.jwtAccessSecret;
    const verifyToken = (await jwt.verify(
      accessToken,
      privateKey,
    )) as IVerifyToken;
    return {
      tokenDetails: verifyToken,
      error: false,
      message: 'Valid access token',
    };
  } catch (error) {
    console.log("🚀 ~ file: verifyTokens.ts:54 ~ verifyAccessToken ~ error:", error)
    return {
      error: true,
      message: 'Invalid access token',
    };
  }
};
