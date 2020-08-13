const config = require("config");

const dbConnection = config.get("DB_CONNECTION");
const env = {
  port: config.has("ENV_PORT") ? config.get("ENV_PORT") : config.get("PORT"),
  env: config.util.getEnv("NODE_ENV"),
  server_debug: config.get("APP_DEBUG.SERVER"),
  api_debug: config.get("APP_DEBUG.API"),
  log: config.get("LOG"),
  dbMongooseConfig: config.get("DB_MONGOOSE_CONFIG"),
  dbConnection: {
    url: config.has("ENV_DB_URL") ? config.get("ENV_DB_URL") : dbConnection.URL,
  },
  models: config.get("MODELS"),
  jwtKey: config.has('ENV_JWT_SECRET_KEY') ? config.get("ENV_JWT_SECRET_KEY") : config.get("JWT_SECRET_KEY"),
  bcryptRounds: config.get("BCRYPT_ROUNDS")
};

const getEnv = () => {
  return { ...env };
};

const setAppEnv = (app) => {
  app.set("env", env.env);
};
module.exports.getEnv = getEnv;
module.exports.setAppEnv = setAppEnv;
