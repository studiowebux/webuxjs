#!/usr/bin/env node

// ██████╗ ██╗███╗   ██╗ █████╗ ██████╗ ██╗   ██╗
// ██╔══██╗██║████╗  ██║██╔══██╗██╔══██╗╚██╗ ██╔╝
// ██████╔╝██║██╔██╗ ██║███████║██████╔╝ ╚████╔╝
// ██╔══██╗██║██║╚██╗██║██╔══██║██╔══██╗  ╚██╔╝
// ██████╔╝██║██║ ╚████║██║  ██║██║  ██║   ██║
// ╚═════╝ ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝

/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2018-07-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const fs = require("fs");
const header = require("./utils/header");
const { Webux } = require("webux-app");

let server;
let port;

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = port => {
  if (parseInt(port, 10) >= 0) {
    return parseInt(port, 10);
  }
  throw new Error("Invalid port !");
};

/**
 * Event listener for HTTP server "error" event.
 */

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      throw new Error(bind + " requires elevated privileges");
    case "EADDRINUSE":
      throw new Error(bind + " is already in use");
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  Webux.log.info("Listening on " + bind);
};

const CreateServer = (app, options) => {
  if (options.ssl.enabled) {
    const sslOptions = {
      key: fs.readFileSync(options.ssl.key),
      cert: fs.readFileSync(options.ssl.crt)
    };
    server = require("https").createServer(sslOptions, app);
  } else {
    server = require("http").createServer(app);
  }

  port = normalizePort(process.env.PORT || options.port);
  app.set("port", port);

  server.on("error", onError);
  server.on("listening", onListening);

  // Graceful shutdown
  process.on("SIGTERM", () => {
    server.close(err => {
      if (err) {
        throw err;
      }
      process.exit(0);
    });
  });

  server.listen(port, () => {
    header(app, options);
  });
};

module.exports = CreateServer;
