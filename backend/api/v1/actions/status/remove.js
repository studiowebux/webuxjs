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

// action
const removeOneStatus = async statusID => {
  Webux.log.verbose("Remove One Status - Action Called");
  await Webux.isValid.Custom(Webux.validators.status.MongoID, statusID);

  const statusRemoved = await Webux.db.Status.findByIdAndRemove(statusID).catch(
    e => {
      throw Webux.errorHandler(422, e);
    }
  );
  if (!statusRemoved) {
    throw Webux.errorHandler(422, "status not removed");
  }
  return Promise.resolve(statusRemoved);
};

// route
/**
 * @apiGroup Status
 * @api {delete} /api/v1/status/:id Delete a status
 * @apiParam {string} id 
 * @apiDescription Delete a status
 * @apiName Delete a status
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 NO CONTENT
 */
const route = async (req, res, next) => {
  try {
    Webux.log.verbose("Remove One Status - Route Called");
    const obj = await removeOneStatus(req.params.id);
    if (!obj) {
      return next(Webux.errorHandler(422, "Status with ID not deleted."));
    }
    return res.deleted(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = (client, io) => {
  return async statusID => {
    try {
      Webux.log.verbose("Remove One Status - Socket Called");
      const obj = await removeOneStatus(statusID);
      if (!obj) {
        throw new Error("Status with ID not deleted");
      }

      io.emit("statusRemoved", obj);
    } catch (e) {
      client.emit("gotError", e.message);
    }
  };
};

module.exports = {
  removeOneStatus,
  socket,
  route
};
