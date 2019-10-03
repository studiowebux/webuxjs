const path = require("path");

module.exports = {
  baseDir: path.join(__dirname, "..", "api", "v1", "actions"),
  isAuthenticated: require(path.join(
    "..",
    "api",
    "v1",
    "plugins",
    "auth",
    "isAuth.js"
  )),
  accessKey: "accessToken",
  timeout: 5000,
  options: {
    path: "/socket.io",
    redis: {
      mock:
        process.env.REDIS_MOCK && process.env.REDIS_MOCK == "false"
          ? false
          : false,
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: process.env.REDIS_PORT || "6379",
      password: process.env.REDIS_PASSWORD || "password123",
      no_ready_check:
        process.env.REDIS_NO_READY_CHECK &&
        process.env.REDIS_NO_READY_CHECK == "false"
          ? false
          : true,
      enabled: true
    }
  }
};
