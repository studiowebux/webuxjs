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
  await Webux.isValid.Custom(MongoID, statusID);
  await Webux.isValid.Custom(Update, status);

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

const socket = client => {
  return async (statusID, status) => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await updateOneStatus(statusID, status);
      if (!obj) {
        client.emit("gotError", "Status with ID not updated");
      }

      client.emit("statusUpdated", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  updateOneStatus,
  socket,
  route
};
