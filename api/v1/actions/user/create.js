// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: create.js
 * Author: Tommy Gingras
 * Date: 2019-07-13
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const { Create } = require("../../validations/user");

// action
const createUser = async user => {
  await Webux.isValid.Custom(Create, user);

  const userCreated = await Webux.db.User.create(user).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!userCreated) {
    throw Webux.errorHandler(422, "user not created");
  }

  let cleaned = userCreated.toObject();
  delete cleaned["password"];

  return Promise.resolve(cleaned);
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await createUser(req.body.user);
    if (!obj) {
      return next(Webux.errorHandler(422, "User not created"));
    }
    return res.created(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth
const socket = client => {
  return async user => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await createUser(user);
      if (!obj) {
        client.emit("gotError", "User not created");
      }

      client.emit("userCreated", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  createUser,
  socket,
  route
};
