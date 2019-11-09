// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: refresh.js
 * Author: Tommy Gingras
 * Date: 2019-08-31
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("@studiowebux/app");

const refresh = async (req, res, next) => {
  try {
    Webux.log.verbose("Refresh Token Called");
    const newAccess = await Webux.Auth.refreshAccessToken(
      Webux.config.auth.jwt,
      req.body.refreshToken,
      req.body.userID,
      Webux.setIp(req),
      Webux.log
    ).catch(e => {
      throw e;
    });

    if (!newAccess) {
      throw new Error("No access token provided");
    }
    return res.status(200).json({
      msg: "Access Token refreshed",
      token: newAccess
    });
  } catch (e) {
    return next(
      Webux.errorHandler(
        403,
        "An error occurs while refreshing the token : " + e.message,
        {},
        e
      )
    );
  }
};

module.exports = refresh;
