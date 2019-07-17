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
const { select } = require("../../constants/profile");
const toObject = require("../../helpers/toObject");

// action
const findProfile = async query => {
  const profiles = await Webux.db.Profile.find({})
    .lean()
    .select(query.projection || select)
    .limit(query.limit)
    .sort(query.sort)
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });
  if (!profiles || profiles.length === 0) {
    throw Webux.errorHandler(404, "profiles not found");
  }
  return Promise.resolve(toObject(profiles));
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await findProfile(req.query);
    if (!obj) {
      return next(Webux.errorHandler(404, "Profile not found."));
    }
    return res.success(obj);
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
      const obj = await findProfile({});
      if (!obj) {
        client.emit("gotError", "Profile not found");
      }

      client.emit("profileFound", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  findProfile,
  socket,
  route
};
