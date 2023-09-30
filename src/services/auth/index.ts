//lib
import jwt from 'jsonwebtoken';
//DTO
import { CreateUserDTO, LoginUserDTO, RefreshDTO } from '../../dto/auth';

//Model
import { UserModel } from '../../models';

//utils
import { CustomError } from '../../exceptions/customError';
import { generateTokens } from '../../utils/generateTokens';
import { verifyRefreshToken } from '../../utils/verifyTokens';

//config
import serverConfig from '../../config/server';

export class AuthService {
  constructor() {}

  register = async (dto: CreateUserDTO) => {
    try {
      const userModel = new UserModel(dto);
      userModel.hashPassword();
      const user = await userModel.save();
      return user;
    } catch (error: any) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new CustomError(400, 'Пользователь с таким Email уже существует');
      }
    }
  };

  login = async (dto: LoginUserDTO) => {
    try {
      const user = await UserModel.findOne({
        email: dto.email,
      });
      if (!user || !user.comparePassword(dto.password)) {
        throw new CustomError(400, 'Пользователь не найден');
      }
      const { accessToken, refreshToken } = await generateTokens(user);
      return { userId: user._id, accessToken, refreshToken };
    } catch (error) {
      if (error instanceof CustomError) {
        throw new CustomError(400, 'Пользователь не найден');
      }
    }
  };

  refresh = async (dto: RefreshDTO) => {
    const { tokenDetails, error, message } = await verifyRefreshToken(
      dto.refreshToken,
    );
    if (error) {
      throw new CustomError(400, 'Не удалось обновить токен');
    }
    if (tokenDetails) {
      const payload = { _id: tokenDetails._id };
      const accessToken = jwt.sign(payload, serverConfig.jwtAccessSecret, {
        expiresIn: serverConfig.accessTokenExpiresIn,
      });
      return {
        accessToken,
      };
    }
  };
}
