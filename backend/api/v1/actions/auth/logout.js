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

/**
 * @apiGroup Auth
 * @api {post} /api/v1/auth/logout Logout the current user
 * @apiParamExample {json} Request-Example:
 *     {
 *       "accessToken":"JWT-TOKEN",
 *       "refreshToken": "JWT-TOKEN",
 *      }
 * @apiDescription Logout the current user
 * @apiName Logout the current user
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Successfully logged out",
 *         "devMessage": "",
 *         "success": true,
 *         "code": 200
 *     }
 **/
const logout = async (req, res, next) => {
  try {
    const refreshToken = await Webux.Auth.revokeToken(
      req.body.refreshToken
    ).catch(e => {
      throw e;
    });
    if (!refreshToken) {
      throw new Error("Refresh token not removed");
    }

    const accessRemoved = await Webux.Auth.revokeToken(
      req.body.accessToken
    ).catch(e => {
      throw e;
    });
    if (!accessRemoved) {
      throw new Error("Access token not removed");
    }
    return res.success({ message: "Successfully logged out" });
  } catch (e) {
    return next(
      Webux.errorHandler(400, "An error occur while logging out", {}, e)
    );
  }
};

module.exports = logout;
