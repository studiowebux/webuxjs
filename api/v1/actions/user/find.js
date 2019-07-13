// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: find.js
 * Author: Tommy Gingras
 * Date: 2019-07-13
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const { select } = require("../../constants/user");

// action
const findUser = query => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await Webux.db.User.find({})
        .select(query.projection || select)
        .limit(query.limit)
        .sort(query.sort)
        .catch(e => {
          return reject(Webux.errorHandler(422, e));
        });
      if (!users || users.length === 0) {
        return reject(Webux.errorHandler(404, "users not found"));
      }
      return resolve({
        msg: "Success !",
        users: users
      });
    } catch (e) {
      throw e;
    }
  });
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await findUser(req.query);
    if (!obj) {
      return next(Webux.errorHandler(404, "User not found."));
    }
    return res.status(200).json(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async () => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await findUser({});
      if (!obj) {
        client.emit("gotError", "User not found");
      }

      client.emit("userFound", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  findUser,
  socket,
  route
};
