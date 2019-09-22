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
const Webux = require("webux-app");
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
  Webux.InitIsAuth(jwtOptions);

  Webux.LoadConstants(path.join(__dirname, "..", "api", "v1", "constants"));

  Webux.LoadValidators(path.join(__dirname, "..", "api", "v1", "validations"));

  Webux.LoadConfiguration(path.join(__dirname, "..", "config"));

  await Webux.InitLogger();

  await Webux.InitDB();

  await Webux.LoadModels();

  await Webux.LoadSeed();

  Webux.OnRequest();

  Webux.OnResponse();

  await Webux.LoadSecurity();

  Webux.LoadLanguage();

  await Webux.LoadLimiters();

  await Webux.LoadStaticResources();

  await Webux.LoadRoutes();

  await Webux.LoadGlobalErrorHandler();

  await Webux.InitSocket();

  await Webux.InitServer();

  Webux.OnSocket();

  // Initialize the authentication module
  await Webux.InitLocalStrategy(loginFn, registerFn);
  await Webux.InitJWTStrategy(/*deserializeFn*/);
  await Webux.InitRedis();

  Webux.Auth.CheckAuth = require("../api/v1/plugins/auth/isAuth");

  console.log("Application Ready !")
}

module.exports = LoadApp;
