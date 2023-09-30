import mongoose from 'mongoose';
import serverConfig from '../config/server';
import { Logger } from './logger';

export const connectDB = async () => {
  const logger = new Logger();
  try {
    await mongoose.connect(serverConfig.mongoOpts.uri, {
      dbName: serverConfig.mongoOpts.dbName,
    });
    logger.info('Connection established to mongoDB server');
  } catch (error) {
    logger.error('Unable to connect to the mongoDB server. Error:', error);
    setTimeout(connectDB, 5000);
  }
};
