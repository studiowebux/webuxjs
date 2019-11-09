// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: revoke.js
 * Author: Tommy Gingras
 * Date: 2019-08-31
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("@studiowebux/app");

const revoke = async (req, res, next) => {
  try {
    Webux.log.verbose("Revoke Token Called");
    const token = req.body.accessToken || req.body.refreshToken;
    const info = await Webux.Auth.revokeToken(
      token,
      req.user[Webux.config.auth.jwt.id],
      Webux.log
    ).catch(e => {
      throw e;
    });
    if (!info) {
      throw new Error("An error occurs while revoking the token");
    }
    return res.status(200).json({
      msg: "Token revoked"
    });
  } catch (e) {
    return next(
      Webux.errorHandler(400, "An error occur while revoking the token", {}, e)
    );
  }
};

module.exports = revoke;
