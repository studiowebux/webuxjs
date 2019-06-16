const { Webux } = require("../index");

Webux.log.info("This is a test from test 2.1...");

module.exports = () => {
  Webux.log.info("This is a test from test 2...");
};
