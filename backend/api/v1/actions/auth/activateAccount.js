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

/**
 * @apiGroup Auth
 * @api {post} /api/v1/auth/activate-account Activate the user account
 * @apiParamExample {json} Request-Example:
 *     {
 *       "code":"123456789qwertysfghj567",
 *       "email": "admin@webuxlab.com",
 *      }
 * @apiDescription Activate the user account
 * @apiName Activate the user account
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Account successfully activated",
 *         "devMessage": "",
 *         "success": true,
 *         "code": 200
 *     }
 **/
const activateAccount = async (req, res, next) => {
  try {
    Webux.log.verbose("Activate Account Called");
    const info = await Webux.Auth.activateAccount(
      req.body.email,
      req.body.code,
      accountActivationFn,
      Webux.log
    ).catch(e => {
      throw e;
    });
    if (!info) {
      throw new Error("An error occurs while activating the account");
    }
    return res.success(info);
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
