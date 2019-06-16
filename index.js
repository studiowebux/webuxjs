// load options:

// temporary loading manually the options:
const options = {
  language: {
    availables: ["fr", "en"],
    directory: "locales",
    default: "en",
    autoReload: true,
    syncFiles: true
  },
  server: {
    ssl: {
      enabled: false,
      key: "", // absolute path
      crt: "" // absolute path
    },
    enterprise: "Studio Webux S.E.N.C",
    author: "Tommy Gingras",
    project: "Webuxjs",
    version: require("./package.json")["version"],
    port: 1337
  },
  logger: {
    application_id: "Test01",
    forceConsole: true,
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
  },
  security: {
    morgan: {
      // combined, tiny, dev, common, short, json
      type: "json"
    },
    origin: "*",
    bodyParser: {
      limit: "10mb",
      extended: true
    },
    cookieParser: {
      secret: "SHUUUT!"
    }
  }
};

const { CreateApp, Webux } = require("webux-app");
const webuxSecurity = require("webux-security");
const webuxLanguage = require("webux-language");
const webuxServer = require("webux-server");

// load default values

CreateApp(options);

// request logger

webuxSecurity(Webux.app, options.security);

webuxLanguage.init(Webux.app, options.language);

// routes

// sockets

// error handling

Webux.app.get("/", (req, res) => {
  Webux.log.info("Hello World !");
  return res.success({ msg: "Bonjour !" });
});

Webux.app.get("/lang", (req, res) => {
  Webux.log.info("Language getter");
  return res.success(
    {},
    webuxLanguage.getLocale(),
    "Return the actual language used by the backend for this request."
  );
});

webuxServer(Webux.app, options.server);
