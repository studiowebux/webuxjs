const options = {
  logger: {
    application_id: "Test01",
    forceConsole: true,
    logstash: {
      host: "127.0.0.1",
      port: "5000" // udp only !
    },
    filenames: {
      error: "log/error.log"
    },
    blacklist: ["password"]
  }
};

const { CreateApp, Webux } = require("../index");

CreateApp(options);
// CreateApp();

Webux.log.info("This is a test with a global variable !");

require("./test2")();
