// ██╗  ██╗███████╗ █████╗ ██████╗ ███████╗██████╗
// ██║  ██║██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
// ███████║█████╗  ███████║██║  ██║█████╗  ██████╔╝
// ██╔══██║██╔══╝  ██╔══██║██║  ██║██╔══╝  ██╔══██╗
// ██║  ██║███████╗██║  ██║██████╔╝███████╗██║  ██║
// ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝

/**
 * File: header.js
 * Author: Tommy Gingras
 * Date: 2018-07-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const { Webux } = require("webux-app");

module.exports = (app, options) => {
  Webux.log.info("Application started with success.");
  Webux.log.info("Version : " + options.version);
  Webux.log.info("Author: " + options.author + " | " + options.enterprise);
  Webux.log.info(
    "Project : " +
      options.project +
      " is listening on port " +
      app.get("port") +
      "..."
  );
  Webux.log.info("RESTFUL API accessible from : " + options.version);
  Webux.log.info("Mode : " + app.get("env"));
  Webux.log.info("Working Path : " + process.cwd());
};
