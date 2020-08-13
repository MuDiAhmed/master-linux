const mongoose = require("mongoose");
const env = require("./env").getEnv();

mongoose.connect(
  `mongodb://${env.dbConnection.url}`,
  {
      useNewUrlParser: env.dbMongooseConfig.NEW_URL_PARSER,
      useUnifiedTopology: env.dbMongooseConfig.UNIFIED_TOPOLOGY,
      useCreateIndex: env.dbMongooseConfig.CREATE_INDEX,
      bufferCommands: env.dbMongooseConfig.BUFFER_COMMANDS,
      autoIndex: env.dbMongooseConfig.AUTO_INDEX,
      autoCreate: env.dbMongooseConfig.AUTO_CREATE,
      keepAlive: env.dbMongooseConfig.KEEP_ALIVE,
  }
  );
    
mongoose.plugin(require("./plugins/updatedAt"));


module.exports = mongoose.connection;
