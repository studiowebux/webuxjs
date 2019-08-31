// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: logout.js
 * Author: Tommy Gingras
 * Date: 2019-08-31
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");

const logout = async (req, res, next) => {
  try {
    const refreshToken = await Webux.Auth.RevokeRefreshToken(req.body.refreshToken).catch(
      e => {
        throw e;
      }
    );
    if (!refreshToken) {
      throw new Error("Refresh token not removed");
    }

    const accessRemoved = await Webux.Auth.RevokeAccessToken(req.body.accessToken).catch(
      e => {
        throw e;
      }
    );
    if (!accessRemoved) {
      throw new Error("Access token not removed");
    }
    return res.status(200).json({
      msg: "Successfully logged out"
    });
  } catch (e) {
    return next(Webux.errorHandler(400, "An error occur while logging out", {}, e));
  }
};

module.exports = logout;


