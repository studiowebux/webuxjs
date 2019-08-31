// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: activateAccount.js
 * Author: Tommy Gingras
 * Date: 2019-08-31
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const { accountActivationFn } = require("../../plugins/auth/accountActivation");

const activateAccount = async (req, res, next) => {
  try {
    const info = await Webux.Auth.activateAccount(
      req.body.email,
      req.body.code,
      accountActivationFn
    ).catch(e => {
      throw e;
    });
    if (!info) {
      throw new Error("An error occurs while activating the account");
    }
    return res.status(200).json({
      info
    });
  } catch (e) {
    return next(
      Webux.errorHandler(
        400,
        "An error occur while activating the account",
        {},
        e
      )
    );
  }
};

module.exports = activateAccount;
