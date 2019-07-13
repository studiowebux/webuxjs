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
const updateOneUser = (userID, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Webux.isValid
        .Custom(MongoID)(userID)
        .catch(e => {
          return reject(e); // returned a pre-formatted error
        });
      await Webux.isValid
        .Custom(Update)(user)
        .catch(e => {
          return reject(e); // returned a pre-formatted error
        });

      const userUpdated = await Webux.db.User.findByIdAndUpdate(userID, user, {
        new: true
      }).catch(e => {
        return reject(Webux.errorHandler(422, e));
      });
      if (!userUpdated) {
        return reject(Webux.errorHandler(422, "user not updated"));
      }
      return resolve({
        msg: "Success !",
        user: userUpdated
      });
    } catch (e) {
      throw e;
    }
  });
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await updateOneUser(req.params.id, req.body.user);
    if (!obj) {
      return next(Webux.errorHandler(422, "User with ID not updated."));
    }
    return res.status(200).json(obj);
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
