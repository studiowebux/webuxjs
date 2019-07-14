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
const { MongoID, Update } = require("../../validations/profile");

// action
const updateOneProfile = (profileID, profile) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Webux.isValid
        .Custom(MongoID)(profileID)
        .catch(e => {
          return reject(e); // returned a pre-formatted error
        });
      await Webux.isValid
        .Custom(Update)(profile)
        .catch(e => {
          return reject(e); // returned a pre-formatted error
        });

      const profileUpdated = await Webux.db.Profile.findByIdAndUpdate(
        profileID,
        profile,
        {
          new: true
        }
      ).catch(e => {
        return reject(Webux.errorHandler(422, e));
      });
      if (!profileUpdated) {
        return reject(Webux.errorHandler(422, "profile not updated"));
      }
      return resolve(profileUpdated);
    } catch (e) {
      throw e;
    }
  });
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await updateOneProfile(req.params.id, req.body.profile);
    if (!obj) {
      return next(Webux.errorHandler(422, "Profile with ID not updated."));
    }
    return res.updated(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async (profileID, profile) => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await updateOneProfile(profileID, profile);
      if (!obj) {
        client.emit("gotError", "Profile with ID not updated");
      }

      client.emit("profileUpdated", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  updateOneProfile,
  socket,
  route
};
