// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: bodyParser.js
 * Author: Tommy Gingras
 * Date: 2019-05-25
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const bodyParser = require("body-parser");

module.exports = (app, options) => {
  app.use(
    bodyParser.json({
      limit: options.limit
    })
  );

  app.use(
    bodyParser.urlencoded({
      limit: options.limit,
      extended: options.extended
    })
  );
};
