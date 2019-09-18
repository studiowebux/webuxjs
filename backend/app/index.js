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
  // load isAuth middleware
  Webux.CreateIsAuth(jwtOptions);

  // Load constants
  await Webux.LoadConstants(
    path.join(__dirname, "..", "api", "v1", "constants")
  );

  // Load validators
  await Webux.LoadValidators(
    path.join(__dirname, "..", "api", "v1", "validations")
  );

  // Load configuration
  await Webux.LoadConfiguration(path.join(__dirname, "..", "config"));

  // Create logger
  await Webux.CreateLogger();

  // initialize the Database
  await Webux.InitDB();

  // initialize the Database Models
  await Webux.LoadModels();

  // load default values
  await Webux.LoadSeed();

  // request logger
  await Webux.OnRequest();

  // Load security
  await Webux.LoadSecurity();

  // Load Language
  await Webux.LoadLanguage();

  // Create Limiter
  await Webux.CreateLimiter();

  // Initialize the authentication module
  await Webux.InitLocalStrategy(loginFn, registerFn);
  await Webux.InitJWTStrategy(/*deserializeFn*/);
  await Webux.InitRedis();

  // routes
  await Webux.CreateRoutes();

  // static routes
  await Webux.LoadStaticResources();

  // sockets
  await Webux.CreateSockets();

  // error handling
  await Webux.GlobalErrorHandler();

  // start server
  await Webux.StartServer();

  // start sockets
  await Webux.StartSocket();

  Webux.Auth.CheckAuth = require("../api/v1/plugins/auth/isAuth");
}

module.exports = LoadApp;
