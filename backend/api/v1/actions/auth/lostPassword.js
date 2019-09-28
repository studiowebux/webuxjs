// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: lostPassword.js
 * Author: Tommy Gingras
 * Date: 2019-08-31
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const { lostPasswordFn } = require("../../plugins/auth/accountPassword");

const lostPassword = async (req, res, next) => {
  try {
    const info = await Webux.Auth.lostPassword(
      req.body.email,
      lostPasswordFn,
      Webux.log
    ).catch(e => {
      throw e;
    });
    if (!info) {
      throw new Error("An error occurs while generating the instructions");
    }
    return res.status(200).json({
      msg:
        "Request to retrieve password, you can specify which way is better to send the information generated in the lostPasswordFn",
      info
    });
  } catch (e) {
    return next(
      Webux.errorHandler(
        400,
        "An error occur while trying to send the instructions",
        {},
        e
      )
    );
  }
};

module.exports = lostPassword;
