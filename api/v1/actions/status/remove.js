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
const { MongoID } = require("../../validations/status");

// action
const removeOneStatus = async statusID => {
  await Webux.isValid.Custom(MongoID, statusID);

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
const route = async (req, res, next) => {
  try {
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

const socket = client => {
  return async statusID => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await removeOneStatus(statusID);
      if (!obj) {
        client.emit("gotError", "Status with ID not deleted");
      }

      client.emit("statusRemoved", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  removeOneStatus,
  socket,
  route
};
