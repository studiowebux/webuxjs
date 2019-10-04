// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: findOne.js
 * Author: Tommy Gingras
 * Date: 2019-07-16
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");

// action
const findOneStatus = async (statusID, query) => {
  await Webux.isValid.Custom(Webux.validators.status.MongoID, statusID);

  const status = await Webux.db.Status.findById(statusID)
    .select(query.projection || Webux.constants.status.select)
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });

  if (!status) {
    throw Webux.errorHandler(404, "status not found");
  }
  return Promise.resolve(status);
};

// route
/**
 * @apiGroup Status
 * @api {get} /api/v1/status/:id Get one status
 * @apiParam {string} id
 * @apiDescription Get one status
 * @apiName Get one status
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
 *           "body": {
 *               "_id": "5d2fb7606df7688537f20b6a",
 *               "name": "New",
 *               "description": "New product",
 *               "color": "00ff11"
 *           }
 *       }
 **/
const route = async (req, res, next) => {
  try {
    const obj = await findOneStatus(req.params.id, req.query);
    if (!obj) {
      return next(Webux.errorHandler(404, "Status with ID not found."));
    }
    return res.success(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async statusID => {
    try {
      const obj = await findOneStatus(statusID, {});
      if (!obj) {
        throw new Error("Status with ID not found");
      }

      client.emit("statusFound", obj);
    } catch (e) {
      client.emit("gotError", e.message);
    }
  };
};

module.exports = {
  findOneStatus,
  socket,
  route
};
