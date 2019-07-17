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
