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

// TODO : REMOVE THIS FUNCTION

const Webux = require("webux-app");

// action
const removeOneProfile = async profileID => {
  await Webux.isValid.Custom(Webux.validators.profile.MongoID, profileID);

  const profileRemoved = await Webux.db.Profile.findByIdAndRemove(
    profileID
  ).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!profileRemoved) {
    throw Webux.errorHandler(422, "profile not removed");
  }
  return Promise.resolve(profileRemoved);
};

// route
/**
 * @apiGroup Profile
 * @api {delete} /api/v1/profile/:id Delete a profile
 * @apiParam {string} id
 * @apiDescription Delete a profile
 * @apiName Delete a profile
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 NO CONTENT
 */
const route = async (req, res, next) => {
  try {
    const obj = await removeOneProfile(req.params.id);
    if (!obj) {
      return next(Webux.errorHandler(422, "Profile with ID not deleted."));
    }
    return res.deleted(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async profileID => {
    Webux.log.verbose("Request to remove a profile");
    try {
      const obj = await removeOneProfile(profileID);
      if (!obj) {
        throw new Error("Profile with ID not deleted");
      }

      client.emit("profileRemoved", obj);
    } catch (e) {
      client.emit("gotError", e.message);
    }
  };
};

module.exports = {
  removeOneProfile,
  socket,
  route
};
