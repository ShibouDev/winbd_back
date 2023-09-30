//libs
import { Router } from 'express';

//controller
import { AuthController } from '../../controllers';

//DTO
import { CreateUserDTO, LoginUserDTO, RefreshDTO } from '../../dto/auth';

//middlewares
import { validateBodyDTOMiddleware } from '../../middlewares';

export class UserRoutes {
  path = '/api/auth';
  router = Router();

  constructor(authController: AuthController) {
    this.router.post(
      '/register',
      validateBodyDTOMiddleware(CreateUserDTO),
      authController.register,
    );
    this.router.post(
      '/login',
      validateBodyDTOMiddleware(LoginUserDTO),
      authController.login,
    );
    this.router.post(
      '/refresh',
      validateBodyDTOMiddleware(RefreshDTO),
      authController.refresh,
    );
  }
}
