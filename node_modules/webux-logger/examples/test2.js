const options = {
  application_id: "Test01",
  forceConsole: false,
  logstash: {
    host: "127.0.0.1",
    port: "5000" // udp only !
  },
  filenames: {
    error: "log/error.log",
    warn: "log/warn.log",
    info: "log/info.log",
    verbose: "log/verbose.log",
    debug: "log/debug.log",
    silly: "log/silly.log"
  },
  blacklist: ["password"]
};

const webuxlogger = require("webux-logger")(options);

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   verbose: 3,
//   debug: 4,
//   silly: 5
// };

webuxlogger.error("An error occur");
webuxlogger.info("An info occur");
webuxlogger.debug("An debug occur");
webuxlogger.warn({
  message: "watch out ! this is a json !",
  success: false,
  status: 500
});

webuxlogger.info({
  body: {
    password: "JENAGUY",
    user: "PAul",
    email: "john@boby.com",
    lastLogin: "2019-04-05"
  },
  message: "bla bla bla",
  status: 201,
  success: true
});

webuxlogger.info({
  "@timestamp": "2019-09-30T05:09:08.282Z",
  message: "Some log message",
  severity: "info",
  fields: {
    method: "GET",
    url: "/sitemap.xml",
    headers: {
      host: "www.example.com",
      "user-agent":
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      accept: "*/*",
      "accept-encoding": "gzip,deflate",
      from: "googlebot(at)googlebot.com",
      "if-modified-since": "Tue, 30 Sep 2019 11:34:56 GMT",
      "x-forwarded-for": "66.249.78.19"
    }
  }
});
