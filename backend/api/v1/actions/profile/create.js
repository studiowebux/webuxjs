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

const Webux = require("@studiowebux/app");

// action
const createProfile = async profile => {
  Webux.log.verbose("Create Profile - Action Called");
  await Webux.isValid.Custom(Webux.validators.profile.Create, profile);

  const profileCreated = await Webux.db.Profile.create(profile).catch(e => {
    throw Webux.errorHandler(422, e);
  });

  if (!profileCreated) {
    throw Webux.errorHandler(422, "profile not created");
  }

  const profileLinked = await Webux.db.User.findOneAndUpdate(
    { _id: profile.userID },
    { profileID: profileCreated._id },
    { new: true }
  )
    .select(Webux.constants.user.select)
    .populate("profileID", Webux.constants.profile.select)
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });

  if (!profileLinked) {
    throw Webux.errorHandler(422, "profile not linked");
  }

  return Promise.resolve(profileLinked);
};

// route
/**
 * @apiGroup Profile
 * @api {post} /api/v1/profile Create a profile
 * @apiParamExample {json} Request-Example:
 *     {
 *        "profile":{
 *          "fullname":"John Doe"
 *        }
 *      }
 * @apiDescription Create a profile
 * @apiName Create a profile
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 CREATED
 *       {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 201,
 *           "body": {
 *               "_id": "5d2fb10059f0587ef1dd06e7",
 *               "email": "user@webuxlab.com",
 *               "created_at": "2019-07-17T23:36:32.271Z",
 *               "updated_at": "2019-07-17T23:39:50.573Z",
 *               "__v": 0,
 *               "profileID": "5d2fb1c659f0587ef1dd06f2"
 *           }
 *       }
 */
const route = async (req, res, next) => {
  try {
    Webux.log.verbose("Create Profile - Route Called");
    const profile = {
      ...req.body.profile,
      userID: req.user[Webux.config.auth.jwt.id]
    };
    const obj = await createProfile(profile);
    if (!obj) {
      return next(Webux.errorHandler(422, "Profile not created"));
    }
    return res.created(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth
const socket = client => {
  return async data => {
    try {
      Webux.log.verbose("Create Profile - Socket Called");
      Webux.Auth.checkAuth(data.accessToken, async (err, user) => {
        if (err || !user) {
          throw err || new Error("Unauthorized");
        }

        Webux.log.verbose(
          "Create Profile, UserID Valid, try to set the Profile information"
        );

        const profile = {
          fullname: data.fullname,
          userID: user[Webux.config.auth.jwt.id]
        };

        const obj = await createProfile(profile).catch(e => {
          client.emit("gotError", e.message);
          return;
        });

        if (!obj) {
          throw new Error("Profile not created");
        }

        client.emit("profileCreated", obj);
      });
    } catch (e) {
      client.emit("gotError", e.message);
    }
  };
};

module.exports = {
  createProfile,
  socket,
  route
};
