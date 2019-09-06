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

/**
 * @apiGroup Auth
 * @api {post} /api/v1/auth/lost-activation Lost activation code
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email":"admin@webuxlab.com",
 *      }
 * @apiDescription Generate and send back a code to activate the user account
 * @apiName Lost activation code
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "New activation code sent to your mailbox",
 *         "devMessage": "",
 *         "success": true,
 *         "code": 200
 *     }
 **/
const lostActivation = async (req, res, next) => {
  try {
    const info = await Webux.Auth.activationCode(
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
    return res.success({
      message: "New activation code sent to your mailbox",
      info
    });
  } catch (e) {
    return next(
      Webux.errorHandler(400, "An error occurs to send instructions", {}, e)
    );
  }
};

module.exports = lostActivation;
