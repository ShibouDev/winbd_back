//controllers
import { AuthController, NewsController } from './controllers';

//services
import { AuthService, NewsService } from './services';

//routes
import { NewsRoutes, UserRoutes } from './routes';

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
    inst['newsService'] = new NewsService();
    inst['userController'] = new AuthController(inst['userService']);
    inst['newsController'] = new NewsController(inst['newsService']);
    inst['routes'] = [
      new UserRoutes(inst['userController']),
      new NewsRoutes(inst['newsController']),
    ];
    logger.info('init finish');
  }
  return {
    init,
    get,
  };
};
