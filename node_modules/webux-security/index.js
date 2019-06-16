// ███████╗███████╗ ██████╗██╗   ██╗██████╗ ██╗████████╗██╗   ██╗
// ██╔════╝██╔════╝██╔════╝██║   ██║██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝
// ███████╗█████╗  ██║     ██║   ██║██████╔╝██║   ██║    ╚████╔╝
// ╚════██║██╔══╝  ██║     ██║   ██║██╔══██╗██║   ██║     ╚██╔╝
// ███████║███████╗╚██████╗╚██████╔╝██║  ██║██║   ██║      ██║
// ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝      ╚═╝

/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2019-06-13
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const helmet = require("helmet");
const compression = require("compression");

const Init = (app, options) => {
  require("./components/bodyParser")(app, options.bodyParser);
  require("./components/cookieParser")(app, options.cookieParser);
  app.use(require("./components/cors")(options.origin));
  app.use(require("./components/morgan")(options.morgan));
  app.use(require("./components/regex")());
  app.use(require("./components/responseTime")(app));
  app.use(require("./components/headers"));
  app.use(compression());
  app.enable("trust proxy");
  app.set("trust proxy", true);
  app.use(helmet());
  app.disable("x-powered-by");
};

module.exports = Init;
