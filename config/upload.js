const path = require("path");

module.exports = {
  destination: path.join(__dirname, "../uploads"),
  tmp: path.join(__dirname, "../.tmp"),
  limits: {
    fileSize: "1024*1024*10"
  },
  abortOnLimit: true,
  safeFileNames: true,
  size: 200
};
