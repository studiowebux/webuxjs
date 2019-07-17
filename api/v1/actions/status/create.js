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
const { Create } = require("../../validations/status");

// action
const createStatus = async status => {
  await Webux.isValid.Custom(Create, status);

  const statusCreated = await Webux.db.Status.create(status).catch(e => {
    throw Webux.errorHandler(422, e);
  });

  if (!statusCreated) {
    throw Webux.errorHandler(422, "status not created");
  }

  return Promise.resolve(statusCreated);
};

// route
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
const socket = client => {
  return async status => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }

      const obj = await createStatus(status);
      if (!obj) {
        client.emit("gotError", "Status not created");
      }

      client.emit("statusCreated", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  createStatus,
  socket,
  route
};
