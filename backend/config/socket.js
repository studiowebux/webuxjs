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
  timeout: 3000,
  options: {
    path: "/socket.io"
  }
};
