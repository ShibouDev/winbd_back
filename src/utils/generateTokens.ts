//types

import { IUserDocument } from '../interfaces';

//lib
import jwt from 'jsonwebtoken';

//models
import { UserTokenModel } from '../models/userToken.model';

//config
import configServer from '../config/server';

export const generateTokens = async (user: IUserDocument) => {
  try {
    const payload = { _id: user._id };
    const accessToken = jwt.sign(payload, configServer.jwtAccessSecret, {
      expiresIn: configServer.accessTokenExpiresIn,
    });
    const refreshToken = jwt.sign(payload, configServer.jwtRefreshSecret, {
      expiresIn: configServer.refreshTokenExpiresIn,
    });

    const userToken = await UserTokenModel.findOne({ user: user._id });
    if (userToken) await userToken.deleteOne();

    await new UserTokenModel({ user: user._id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};
