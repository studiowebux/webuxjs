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
const { MongoID } = require("../../validations/profile");
const { select } = require("../../constants/profile");

// action
const findOneProfile = (profileID, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Webux.isValid
        .Custom(MongoID)(profileID)
        .catch(e => {
          return reject(e); // returned a pre-formatted error
        });
      const profile = await Webux.db.Profile.findById(profileID)
        .select(query.projection || select)
        .catch(e => {
          return reject(Webux.errorHandler(422, e));
        });
      if (!profile) {
        return reject(Webux.errorHandler(404, "profile not found"));
      }
      return resolve(profile);
    } catch (e) {
      throw e;
    }
  });
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await findOneProfile(req.params.id, req.query);
    if (!obj) {
      return next(Webux.errorHandler(404, "Profile with ID not found."));
    }
    return res.success(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async profileID => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await findOneProfile(profileID, {});
      if (!obj) {
        client.emit("gotError", "Profile with ID not found");
      }

      client.emit("profileFound", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  findOneProfile,
  socket,
  route
};
