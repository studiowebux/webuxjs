// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: create.js
 * Author: Tommy Gingras
 * Date: 2019-07-16
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");

// action
const createStatus = async status => {
  await Webux.isValid.Custom(Webux.validators.status.Create, status);

  const statusCreated = await Webux.db.Status.create(status).catch(e => {
    throw Webux.errorHandler(422, e);
  });

  if (!statusCreated) {
    throw Webux.errorHandler(422, "status not created");
  }

  return Promise.resolve(statusCreated);
};

// route
/**
 * @apiGroup Status
 * @api {post} /api/v1/status Create a status
 * @apiParamExample {json} Request-Example:
 *     {
 *        "status":{
 *          "name":"Status 1",
 *          "description": "Description for status 1",
 *          "color": "ffffff"
 *        }
 *      }
 * @apiDescription Create a status
 * @apiName Create a status
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 CREATED
 *     {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 201,
 *           "body": {
 *               "_id": "5d2fafa9f52ba67d93c3b741",
 *               "name": "Status 1",
 *               "description": "Description for status 1",
 *               "color": "ffffff",
 *               "created_at": "2019-07-17T23:30:49.819Z",
 *               "updated_at": "2019-07-17T23:30:49.819Z",
 *               "__v": 0
 *           }
 *       }
 */
const route = async (req, res, next) => {
  try {
    const obj = await createStatus(req.body.status);
    if (!obj) {
      return next(Webux.errorHandler(422, "Status not created"));
    }
    return res.created(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth
const socket = (client, io) => {
  return async status => {
    try {

      const obj = await createStatus(status);
      if (!obj) {
        throw new Error("Status not created");
      }

      io.emit("statusCreated", obj);
    } catch (e) {
      client.emit("gotError", e.message);
    }
  };
};

module.exports = {
  createStatus,
  socket,
  route
};
