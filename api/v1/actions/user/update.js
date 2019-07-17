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
const { MongoID, Update } = require("../../validations/user");

// action
const updateOneUser = async (userID, user) => {
  await Webux.isValid.Custom(MongoID, userID);
  await Webux.isValid.Custom(Update, user);

  const userUpdated = await Webux.db.User.findByIdAndUpdate(userID, user, {
    new: true
  }).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!userUpdated) {
    throw Webux.errorHandler(422, "user not updated");
  }
  return Promise.resolve(userUpdated);
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await updateOneUser(req.params.id, req.body.user);
    if (!obj) {
      return next(Webux.errorHandler(422, "User with ID not updated."));
    }
    return res.updated(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async (userID, user) => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await updateOneUser(userID, user);
      if (!obj) {
        client.emit("gotError", "User with ID not updated");
      }

      client.emit("userUpdated", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  updateOneUser,
  socket,
  route
};
