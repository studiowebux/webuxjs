// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: signup.js
 * Author: Tommy Gingras
 * Date: 2019-08-31
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("@studiowebux/app");
const { activationCodeFn } = require("../../plugins/auth/accountActivation");

const signup = (req, res, next) => {
  Webux.Auth.passport.authenticate(
    "local-signup",
    {
      session: false
    },
    (err, user) => {
      try {
        Webux.log.verbose("Try to Sign Up the User");
        if (err) {
          throw Webux.errorHandler(422, "Incorrect Credentials", {}, err);
        } else if (!err && user) {
          // If the auto activate is enabled.
          if (Webux.config.auth.local.autoActivate) {
            Webux.log.verbose("The account will be automatically activated");
            Webux.db.User.findOneAndUpdate(
              { email: user.email },
              { activated: true }
            ).catch(e => {
              throw e;
            });
          } else {
            Webux.Auth.activationCode(
              user.email,
              activationCodeFn,
              53,
              Webux.log
            )
              .then(code => {
                Webux.log.verbose("Generate and Send Activation Code Called");
                Webux.log.debug(code);
              })
              .catch(e => {
                throw e;
              });
          }
          // Auto login is enabled.
          if (Webux.config.auth.local.autoLogonOnRegister) {
            Webux.log.verbose("Auto Login the User Called");
            req.login(user, {
              session: false
            });
            return res.status(200).json(user);
          } else {
            return res
              .status(200)
              .json({ msg: "Account successfully created." });
          }
        } else {
          throw Webux.errorHandler(
            400,
            "Incorrect Credentials",
            {},
            "No User have been found"
          );
        }
      } catch (e) {
        return next(
          Webux.errorHandler(
            e.code || 400,
            e.message || "Incorrect Credentials",
            e.extra || {},
            e.devMessage || ""
          )
        );
      }
    }
  )(req, res, next);
};

module.exports = signup;
