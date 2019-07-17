// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: findOne.js
 * Author: Tommy Gingras
 * Date: 2019-07-16
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const { MongoID } = require("../../validations/status");
const { select } = require("../../constants/status");

// action
const findOneStatus = async (statusID, query) => {
  await Webux.isValid.Custom(MongoID, statusID);

  const status = await Webux.db.Statuss.findById(statusID)
    .select(query.projection || select)
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });

  if (!status) {
    throw Webux.errorHandler(404, "status not found");
  }
  return Promise.resolve(status);
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await findOneStatus(req.params.id, req.query);
    if (!obj) {
      return next(Webux.errorHandler(404, "Status with ID not found."));
    }
    return res.success(obj);
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
      const obj = await findOneStatus(statusID, {});
      if (!obj) {
        client.emit("gotError", "Status with ID not found");
      }

      client.emit("statusFound", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  findOneStatus,
  socket,
  route
};