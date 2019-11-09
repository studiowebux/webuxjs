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

const Webux = require("@studiowebux/app");

// action
const findProfile = async query => {
  Webux.log.verbose("Find Profile - Action Called");
  const profiles = await Webux.db.Profile.find({})
    .lean()
    .select(query.projection || Webux.constants.profile.select)
    .limit(query.limit)
    .sort(query.sort)
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });
  if (!profiles || profiles.length === 0) {
    throw Webux.errorHandler(404, "profiles not found");
  }
  return Promise.resolve(Webux.toObject(profiles));
};

// route
/**
 * @apiGroup Profile
 * @api {get} /api/v1/profile Get all profiles
 * @apiDescription Get all profiles
 * @apiName Get all profiles
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
 *           "body": {
 *               "5d2fb51ec1a7dd82a532dbc7": {
 *                   "_id": "5d2fb51ec1a7dd82a532dbc7",
 *                   "fullname": "Administrator"
 *               }
 *           }
 *       }
 **/
const route = async (req, res, next) => {
  try {
    Webux.log.verbose("Find Profile - Route Called");
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
      Webux.log.verbose("Find Profile - Socket Called");
      const obj = await findProfile({}).catch(e => {
        client.emit("gotError", e.message);
        return;
      });

      if (!obj) {
        throw new Error("Profile not found");
      }

      client.emit("profileFound", obj);
    } catch (e) {
      client.emit("gotError", e.message);
    }
  };
};

module.exports = {
  findProfile,
  socket,
  route
};
