// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: recoverPassword.js
 * Author: Tommy Gingras
 * Date: 2019-08-31
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const { retrievePasswordFn } = require("../../plugins/auth/accountPassword");

const recoverPassword = async (req, res, next) => {
  try {
    const info = await Webux.Auth.retrievePassword(
      req.body.email,
      req.body.code,
      req.body.password,
      retrievePasswordFn,
      Webux.log
    ).catch(e => {
      throw e;
    });
    if (!info) {
      throw new Error("An error occurs while reseting the password");
    }
    return res.status(200).json({
      info
    });
  } catch (e) {
    return next(
      Webux.errorHandler(
        400,
        "An error occur while reseting the password",
        {},
        e
      )
    );
  }
};

module.exports = recoverPassword;
