// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
                                               

/**
 * File: remove.js
 * Author: Tommy Gingras
 * Date: 2019-07-13
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const { MongoID } = require("../../validations/user");

// action
const removeOneUser = userID => {
  return new Promise(async (resolve, reject) => {
    try {
      await Webux.isValid
        .Custom(MongoID)(userID)
        .catch(e => {
          return reject(e); // returned a pre-formatted error
        });
      const userRemoved = await Webux.db.User.findByIdAndRemove(userID).catch(
        e => {
          return reject(Webux.errorHandler(422, e));
        }
      );
      if (!userRemoved) {
        return reject(Webux.errorHandler(422, "user not removed"));
      }
      return resolve({
        msg: "Success !",
        user: userRemoved
      });
    } catch (e) {
      throw e;
    }
  });
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await removeOneUser(req.params.id);
    if (!obj) {
      return next(Webux.errorHandler(422, "User with ID not deleted."));
    }
    return res.status(204).json(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async userID => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await removeOneUser(userID);
      if (!obj) {
        client.emit("gotError", "User with ID not deleted");
      }

      client.emit("userRemoved", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  removeOneUser,
  socket,
  route
};