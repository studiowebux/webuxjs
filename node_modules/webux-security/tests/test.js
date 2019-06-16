const options = {
  ssl: {
    enabled: false,
    key: "", // absolute path
    crt: "" // absolute path
  },
  enterprise: "Studio Webux S.E.N.C",
  author: "Tommy Gingras",
  project: "Webux-bin",
  version: "from npm package in real life !",
  port: 1337,
  bodyParser: {
    limit: "10mb",
    extended: true
  },
  morgan: {// combined, tiny, dev, common, short, json
    type: "json"
  },
  origin: "*",
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

const express = require("express");
const app = express();
const { CreateApp, Webux } = require("webux-app");
const webuxserver = require("webux-server");

CreateApp(options);
// CreateApp();

Webux.log.info("This is a test with a global variable !");

require("../index")(app, options);

app.get("/", (req, res) => {
  Webux.log.info("Hello World !");
  return res.status(200).json({ msg: "Bonjour !" });
});

webuxserver(options, app); // start the server
