// ██╗   ██╗ █████╗ ██╗     ██╗██████╗  █████╗ ████████╗ ██████╗ ██████╗
// ██║   ██║██╔══██╗██║     ██║██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗
// ██║   ██║███████║██║     ██║██║  ██║███████║   ██║   ██║   ██║██████╔╝
// ╚██╗ ██╔╝██╔══██║██║     ██║██║  ██║██╔══██║   ██║   ██║   ██║██╔══██╗
//  ╚████╔╝ ██║  ██║███████╗██║██████╔╝██║  ██║   ██║   ╚██████╔╝██║  ██║
//   ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝

/**
 * File: profile.js
 * Author: Tommy Gingras
 * Date: 2019-07-13
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Joi = require("joi");

const Create = Joi.object()
  .keys({
    fullname: Joi.string()
      .regex(/^([a-zA-Z\u00C0-\u017F]+\ {1}[a-zA-Z\u00C0-\u017F]+)+/i)
      .required(),
    userID: Joi.string()
      .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
      .required()
  })
  .required();

const Update = Joi.object()
  .keys({
    fullname: Joi.string()
      .alphanum()
      .required()
  })
  .required();

const MongoID = Joi.string()
  .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  .required();

module.exports = {
  Create,
  Update,
  MongoID
};
