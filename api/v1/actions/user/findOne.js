// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: findOne.js
 * Author: Tommy Gingras
 * Date: 2019-07-13
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const { MongoID } = require("../../validations/user");
const { select } = require("../../constants/user");

// action
const findOneUser = (userID, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Webux.isValid
        .Custom(MongoID)(userID)
        .catch(e => {
          return reject(e); // returned a pre-formatted error
        });
      const user = await Webux.db.User.findById(userID)
        .select(query.projection || select)
        .populate("profileID")
        .catch(e => {
          return reject(Webux.errorHandler(422, e));
        });
      if (!user) {
        return reject(Webux.errorHandler(404, "user not found"));
      }
      return resolve({
        msg: "Success !",
        user: user
      });
    } catch (e) {
      throw e;
    }
  });
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await findOneUser(req.params.id, req.query);
    if (!obj) {
      return next(Webux.errorHandler(404, "User with ID not found."));
    }
    return res.status(200).json(obj);
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
      const obj = await findOneUser(userID, {});
      if (!obj) {
        client.emit("gotError", "User with ID not found");
      }

      client.emit("userFound", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  findOneUser,
  socket,
  route
};
