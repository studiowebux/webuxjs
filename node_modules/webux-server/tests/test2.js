const { Webux } = require("webux-app");

Webux.log.info("This is a test from test 2.1...");

module.exports = () => {
  console.log("NAH");
  Webux.log.info("This is a test from test 2...");
};
