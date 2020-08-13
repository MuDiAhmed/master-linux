const db = require("./db");
const app = require("./bootstrap");
const env = require("./env").getEnv();
const debug = require("debug")(env.server_debug);

const startSever = () => {
  app.listen(env.port, () => debug(`listening to port ${env.port}`));
};
db.on("error", () => debug("connection error: "))
  .on("connected", () => {
    debug("connected successfully");
    startSever();
  })
  .on("disconnected", () => {
    debug("DB disconnected");
  });
