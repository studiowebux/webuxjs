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
const { MongoID, Update } = require("../../validations/part");

// action
const updateOnePart = async (partID, part) => {
  await Webux.isValid.Custom(MongoID, partID);
  await Webux.isValid.Custom(Update, part);

  const partUpdated = await Webux.db.Part.findByIdAndUpdate(partID, part, {
    new: true
  }).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!partUpdated) {
    throw Webux.errorHandler(422, "part not updated");
  }
  return Promise.resolve(partUpdated);
};

// route
/**
 * @apiGroup Part
 * @api {put} /api/v1/part/:id Update a part
 * @apiParam {string} id
 * @apiParamExample {json} Request-Example:
 *     {
 *        "part":{
 *          "name":"Part 1",
 *          "description": "Description for part 1",
 *          "userID": "5d2faf0cf52ba67d93c3a543",
 *          "statusID": "5d2faf0cf52ba67d93c3b766",
 *          "categoriesID": ["5d2faf0cf52ba67d93c3b738","5d2faf0cf52ba67d93c3b739"]
 *        }
 *      }
 * @apiDescription Update a part
 * @apiName Update a part
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "",
 *         "devMessage": "",
 *         "success": true,
 *         "code": 200,
 *         "body": {
 *             "_id": "5d2fb10d59f0587ef1dd06ef",
 *             "name": "Part 1",
 *             "description": "Description for part 1",
 *             "userID": "5d2faf0cf52ba67d93c3a543",
 *             "statusID": "5d2faf0cf52ba67d93c3b766",
 *             "created_at": "2019-07-17T23:36:45.467Z",
 *             "updated_at": "2019-07-17T23:36:45.467Z",
 *             "__v": 0
 *         }
 *     }
 */
const route = async (req, res, next) => {
  try {
    const obj = await updateOnePart(req.params.id, req.body.part);
    if (!obj) {
      return next(Webux.errorHandler(422, "Part with ID not updated."));
    }
    return res.updated(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async (partID, part) => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await updateOnePart(partID, part);
      if (!obj) {
        client.emit("gotError", "Part with ID not updated");
      }

      client.emit("partUpdated", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  updateOnePart,
  socket,
  route
};
