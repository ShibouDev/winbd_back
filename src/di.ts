//controllers
import { AuthController } from './controllers';

//services
import { AuthService } from './services';

//routes
import { UserRoutes } from './routes/user';

//utils
import { connectDB } from './utils/connectDB';
import { Logger } from './utils/logger';

export const di = () => {
  const logger = new Logger();
  logger.info('start');

  function get(instName: string) {
    return inst[instName];
  }

  const inst: { [key: string]: any } = {};

  async function init() {
    logger.info('init');
    await connectDB();
    inst['userService'] = new AuthService();
    inst['userController'] = new AuthController(inst['userService']);
    inst['routes'] = [new UserRoutes(inst['userController'])];
    logger.info('init finish');
  }
  return {
    init,
    get,
  };
};
