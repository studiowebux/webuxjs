// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: find.js
 * Author: Tommy Gingras
 * Date: 2019-07-16
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const { select } = require("../../constants/status");
const toObject = require("../../helpers/toObject");

// action
const findStatus = async query => {
  const status = await Webux.db.Status.find({})
    .lean()
    .select(query.projection || select)
    .limit(query.limit)
    .sort(query.sort)
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });

  if (!status || status.length === 0) {
    throw Webux.errorHandler(404, "status not found");
  }
  return Promise.resolve(toObject(status));
};

// route
/**
 * @apiGroup Status
 * @api {get} /api/v1/status Get all status
 * @apiDescription Get all status
 * @apiName Get all status
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
 *           "body": {
 *               "5d2fb51ec1a7dd82a532dbc8": {
 *                   "_id": "5d2fb51ec1a7dd82a532dbc8",
 *                   "name": "New",
 *                   "description": "New product",
 *                   "color": "00ff11"
 *               }
 *           }
 *       }
 **/
const route = async (req, res, next) => {
  try {
    const obj = await findStatus(req.query);
    if (!obj) {
      return next(Webux.errorHandler(404, "Status not found."));
    }
    return res.success(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async () => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await findStatus({});
      if (!obj) {
        client.emit("gotError", "Status not found");
      }

      client.emit("statusFound", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  findStatus,
  socket,
  route
};
