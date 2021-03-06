// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: update.js
 * Author: Tommy Gingras
 * Date: 2019-07-13
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const { MongoID, Update } = require("../../validations/status");

// action
const updateOneStatus = async (statusID, status) => {
  await Webux.isValid.Custom(Webux.validators.status.MongoID, statusID);
  await Webux.isValid.Custom(Webux.validators.status.Update, status);

  const statusUpdated = await Webux.db.Status.findByIdAndUpdate(
    statusID,
    status,
    {
      new: true
    }
  ).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!statusUpdated) {
    throw Webux.errorHandler(422, "status not updated");
  }
  return Promise.resolve(statusUpdated);
};

// route
/**
 * @apiGroup Status
 * @api {put} /api/v1/status/:id Update a status
 * @apiParam {string} id
 * @apiParamExample {json} Request-Example:
 *     {
 *        "status":{
 *          "name":"Status 1",
 *          "description": "Description for status 1",
 *          "color": "ffffff"
 *        }
 *      }
 * @apiDescription Update a status
 * @apiName Update a status
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
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
    const obj = await updateOneStatus(req.params.id, req.body.status);
    if (!obj) {
      return next(Webux.errorHandler(422, "Status with ID not updated."));
    }
    return res.updated(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = (client, io) => {
  return async (statusID, status) => {
    try {

      Webux.log.verbose("Request to update a status");
      const obj = await updateOneStatus(statusID, status);
      if (!obj) {
        throw new Error("Status with ID not updated");
      }

      io.emit("statusUpdated", obj);
    } catch (e) {
      client.emit("gotError", e.message);
    }
  };
};

module.exports = {
  updateOneStatus,
  socket,
  route
};
