export default {
  PORT: 5555,
  address: '0.0.0.0',
  cors: { origin: true, methods: ['GET'] },
  validationPipe: { whitelist: true, transform: true },
  jwtAccessSecret: 'jwt-secret-key',
  jwtRefreshSecret: 'jwt-refresh-secret-key',
  accessTokenExpiresIn: "15m",
  refreshTokenExpiresIn: "30d",
  mongoOpts: {
    uri: 'mongodb://mongo_user:mongo_user@localhost:27017/?authMechanism=DEFAULT',
    dbName: 'winbd',
  },
};
