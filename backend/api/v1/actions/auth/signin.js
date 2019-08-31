// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: signin.js
 * Author: Tommy Gingras
 * Date: 2019-08-31
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");

const signin = (req, res, next) => {
  Webux.Auth.passport.authenticate(
    "local-signin",
    {
      session: false
    },
    (err, user) => {
      try {
        if (err) {
          return next(
            Webux.errorHandler(400, "Incorrect Credentials", {}, error)
          );
        } else if (!err && user) {
          req.login(user, {
            session: false
          });

          return res.status(200).json(user);
        } else {
          return next(
            Webux.errorHandler(
              400,
              "Incorrect Credentials",
              {},
              "No User have been found"
            )
          );
        }
      } catch (e) {
        return next(Webux.errorHandler(400, "Incorrect Credentials", {}, e));
      }
    }
  )(req, res, next);
};

module.exports = signin;
