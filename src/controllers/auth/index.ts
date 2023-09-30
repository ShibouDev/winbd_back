//Types
import { Request, Response } from 'express';

//service
import { AuthService } from '../../services';

//utils
import { CustomError } from '../../exceptions/customError';

//DTO
import { CreateUserDTO, LoginUserDTO } from '../../dto/auth';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request<{}, {}, CreateUserDTO>, res: Response) => {
    try {
      const user = await this.authService.register(req.body);
      if (!user) return res.status(400).json(user);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ msg: error.message });
        return;
      }
      res.status(500).json({ msg: 'Internal Server' });
      return;
    }
  };

  login = async (req: Request<{}, {}, LoginUserDTO>, res: Response) => {
    try {
      const user = await this.authService.login(req.body);
      return res.status(200).json({
        userId: user?.userId,
        accessToken: user?.accessToken,
        refreshToken: user?.refreshToken,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ msg: error.message });
        return;
      }
      res.status(500).json({ msg: 'Internal Server' });
      return;
    }
  };

  refresh = async (req: Request, res: Response) => {
    try {
      const accessToken = await this.authService.refresh(req.body);
      return res.status(200).json(accessToken);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ msg: error.message });
        return;
      }
      res.status(500).json({ msg: 'Internal Server' });
      return;
    }
  };


}
