// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: create.js
 * Author: Tommy Gingras
 * Date: 2019-07-14
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const { Create } = require("../../validations/profile");

// action
const createProfile = profile => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(profile);
      await Webux.isValid
        .Custom(Create)(profile)
        .catch(e => {
          return reject(e); // returned a pre-formatted error
        });

      const profileCreated = await Webux.db.Profile.create(profile).catch(e => {
        return reject(Webux.errorHandler(422, e));
      });
      if (!profileCreated) {
        return reject(Webux.errorHandler(422, "profile not created"));
      }

      const profileLinked = await Webux.db.User.findOneAndUpdate(
        { _id: profile.userID },
        { profileID: profileCreated._id },
        { new: true }
      ).catch(e => {
        return reject(Webux.errorHandler(422, e));
      });
      if (!profileLinked) {
        return reject(Webux.errorHandler(422, "profile not linked"));
      }

      return resolve(profileLinked);
    } catch (e) {
      throw e;
    }
  });
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await createProfile(req.body.profile);
    if (!obj) {
      return next(Webux.errorHandler(422, "Profile not created"));
    }
    return res.created(obj);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// socket with auth
const socket = client => {
  return async profile => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await createProfile(profile);
      if (!obj) {
        client.emit("gotError", "Profile not created");
      }

      client.emit("profileCreated", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  createProfile,
  socket,
  route
};
