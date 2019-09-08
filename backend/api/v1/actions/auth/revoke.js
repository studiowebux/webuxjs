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

const Webux = require("webux-app");

const revoke = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.user);
    const token = req.body.accessToken || req.body.refreshToken;
    const info = await Webux.Auth.RevokeToken(
      token,
      req.user[Webux.config.auth.jwt.id]
    ).catch(e => {
      console.error(e);
      throw e;
    });
    if (!info) {
      console.log("No info !");
      throw new Error("An error occurs while revoking the token");
    }
    return res.status(200).json({
      msg: "Token revoked"
    });
  } catch (e) {
    console.error(e);
    return next(
      Webux.errorHandler(400, "An error occur while revoking the token", {}, e)
    );
  }
};

module.exports = revoke;