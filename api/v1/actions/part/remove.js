// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: remove.js
 * Author: Tommy Gingras
 * Date: 2019-07-16
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const { MongoID } = require("../../validations/part");

// action
const removeOnePart = async partID => {
  await Webux.isValid.Custom(MongoID, partID);

  const partRemoved = await Webux.db.Part.findByIdAndRemove(partID).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!partRemoved) {
    throw Webux.errorHandler(422, "part not removed");
  }
  return Promise.resolve(partRemoved);
};

// route
/**
 * @apiGroup Part
 * @api {delete} /api/v1/part/:id Delete a part
 * @apiParam {string} id 
 * @apiDescription Delete a part
 * @apiName Delete a part
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 NO CONTENT
 */
const route = async (req, res, next) => {
  try {
    const obj = await removeOnePart(req.params.id);
    if (!obj) {
      return next(Webux.errorHandler(422, "Part with ID not deleted."));
    }
    return res.deleted(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async partID => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await removeOnePart(partID);
      if (!obj) {
        client.emit("gotError", "Part with ID not deleted");
      }

      client.emit("partRemoved", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  removeOnePart,
  socket,
  route
};
