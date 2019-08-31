// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: lostActivation.js
 * Author: Tommy Gingras
 * Date: 2019-08-31
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const { lostActivationFn } = require("../../plugins/auth/accountActivation");

const lostActivation = async (req, res, next) => {
  try {
    const info = await Webux.Auth.lostActivationCode(
      req.body.email,
      lostActivationFn
    ).catch(e => {
      throw e;
    });
    if (!info) {
      throw new Error(
        "An error occurs while generating the lost activation code"
      );
    }
    return res.status(200).json({
      msg:
        "Request to retrieve activation code, you can specify which way is better to send the information generated in the lostActivationFn",
      info
    });
  } catch (e) {
    return next(
      Webux.errorHandler(400, "An error occurs to send instructions", {}, e)
    );
  }
};

module.exports = lostActivation;
