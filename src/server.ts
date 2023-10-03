import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';
import serverConfig from './config/server';
import { di } from './di';
import { Logger } from './utils/logger';

async function server() {
  const logger = new Logger();
  const dependencyInjection = di();
  await dependencyInjection.init();
  const app = express();
  const port = serverConfig.PORT;

  app.use(cors({ credentials: true, origin: '*' }));
  app.use('/images', express.static('static/images'))
  app.use(express.json());
  dependencyInjection.get('routes').forEach((route: any) => {
    app.use(route.path, route.router);
  });
  app.listen(port, () => {
    logger.info(`Server started on port: ${port}`);
  });
}
server();
