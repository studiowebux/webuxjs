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
const async = require("async");

/**
 * It initializes the application.
 * @returns {Function} The webux object
 */

async function LoadApp() {
  async.series(
    [
      callback => {
        // load isAuth middleware
        Webux.CreateIsAuth(jwtOptions);
        callback();
      },
      callback => {
        async.parallel(
          [
            callback => {
              // Load constants
              Webux.LoadConstants(
                path.join(__dirname, "..", "api", "v1", "constants")
              ).then(() => callback());
            },
            callback => {
              // Load validators
              Webux.LoadValidators(
                path.join(__dirname, "..", "api", "v1", "validations")
              ).then(() => callback());
            },
            callback => {
              // Load configuration
              Webux.LoadConfiguration(path.join(__dirname, "..", "config"));
              callback();
            }
          ],
          err => {
            callback(err);
          }
        );
      },
      callback => {
        // Create logger
        Webux.CreateLogger();
        callback();
      },
      callback => {
        // initialize the Database
        Webux.InitDB().then(() => callback());
      },
      callback => {
        // initialize the Database Models
        Webux.LoadModels().then(() => callback());
      },
      callback => {
        // load default values
        if (Webux.config.seed.enabled) {
          Webux.LoadSeed().then(() => callback());
        } else {
          callback();
        }
      },
      callback => {
        async.parallel(
          [
            callback => {
              // request logger
              Webux.OnRequest();
              callback();
            },
            callback => {
              // Load security
              Webux.LoadSecurity();
              callback();
            },
            callback => {
              // Load Language
              Webux.LoadLanguage();
              callback();
            },
            callback => {
              // Create Limiter
              Webux.CreateLimiter().then(() => callback());
            }
          ],
          err => {
            callback(err);
          }
        );
      },
      callback => {
        async.parallel(
          [
            callback => {
              // Initialize the authentication module
              Webux.InitLocalStrategy(loginFn, registerFn).then(() =>
                callback()
              );
            },
            callback => {
              Webux.InitJWTStrategy(/*deserializeFn*/).then(() => callback());
            },
            callback => {
              Webux.InitRedis().then(() => callback());
            }
          ],
          err => {
            callback(err);
          }
        );
      },
      callback => {
        // routes
        Webux.CreateRoutes().then(() => {
          callback();
        });
      },
      callback => {
        // static routes
        Webux.LoadStaticResources().then(() => {
          callback();
        });
      },
      callback => {
        // sockets
        Webux.CreateSockets().then(() => {
          callback();
        });
      },
      callback => {
        // error handling
        Webux.GlobalErrorHandler();
        callback();
      },
      callback => {
        // start server
        Webux.StartServer().then(() => {
          callback();
        });
      },
      callback => {
        // start sockets
        Webux.StartSocket();
        callback();
      },
      callback => {
        Webux.Auth.CheckAuth = require("../api/v1/plugins/auth/isAuth");
        callback();
      }
    ],
    err => {
      console.error(err);
      console.log("App Ready !");
    }
  );
}

module.exports = LoadApp;
