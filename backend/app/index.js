// █████╗ ██████╗ ██████╗
// ██╔══██╗██╔══██╗██╔══██╗
// ███████║██████╔╝██████╔╝
// ██╔══██║██╔═══╝ ██╔═══╝
// ██║  ██║██║     ██║
// ╚═╝  ╚═╝╚═╝     ╚═╝

/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2019-07-13
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const path = require("path");
const Webux = require("@studiowebux/app");
const { loginFn, registerFn } = require("../api/v1/plugins/auth/local");
// const { deserializeFn } = require("../api/v1/plugins/auth/local"); // if required
const jwtOptions = require(path.join(__dirname, "..", "config", "auth")).jwt;

/**
 * It initializes the application.
 * @returns {Function} The webux object
 */

async function LoadApp() {
  Webux.LoadResponses();

  // load isAuth middleware
  await Webux.InitIsAuth(jwtOptions);

  Webux.LoadConstants(path.join(__dirname, "..", "api", "v1", "constants"));

  Webux.LoadValidators(path.join(__dirname, "..", "api", "v1", "validations"));

  Webux.LoadConfiguration(path.join(__dirname, "..", "config"));

  await Webux.InitLogger();

  await Webux.InitDB();

  await Webux.LoadModels();

  if (Webux.config.seed.enabled) {
    await Webux.LoadSeed();
  }

  Webux.OnRequest();

  Webux.OnResponse();

  await Webux.LoadSecurity();

  Webux.LoadLanguage();

  await Webux.LoadLimiters();

  await Webux.LoadStaticResources();

  await Webux.LoadRoutes();

  await Webux.LoadGlobalErrorHandler();

  await Webux.InitServer();

  await Webux.InitSocket();

  // Initialize the authentication module
  await Webux.InitLocalStrategy(loginFn, registerFn);
  await Webux.InitJWTStrategy(/*deserializeFn*/);
  await Webux.InitRedis();

  Webux.Auth.checkAuth = require("../api/v1/plugins/auth/isAuth");
  Webux.setIp = require("../api/v1/helpers/setIp");

  Webux.log.info("Application Ready !");
}

module.exports = LoadApp;
