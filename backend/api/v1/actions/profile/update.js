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

// action
const updateOneProfile = async (profileID, profile) => {
  await Webux.isValid.Custom(Webux.validators.profile.MongoID, profileID);
  await Webux.isValid.Custom(Webux.validators.profile.Update, profile);

  const profileUpdated = await Webux.db.Profile.findByIdAndUpdate(
    profileID,
    profile,
    {
      new: true
    }
  ).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!profileUpdated) {
    throw Webux.errorHandler(422, "profile not updated");
  }
  return Promise.resolve(profileUpdated);
};

// route
/**
 * @apiGroup Profile
 * @api {put} /api/v1/profile/:id Update a profile
 * @apiParam {string} id
 * @apiParamExample {json} Request-Example:
 *     {
 *        "profile":{
 *          "fullname":"John Doe",
 *          "userID":"5d2fb10059f0587ef1dd06e7"
 *        }
 *      }
 * @apiDescription Update a profile
 * @apiName Update a profile
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
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
  return data => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }

      Webux.Auth.CheckAuth(data.accessToken, async (err, user) => {
        try {
          if (err || !user) {
            throw err || new Error("Unauthorized");
          }

          const profile = {
            fullname: data.fullname,
            userID: user[Webux.config.auth.jwt.id]
          };

          const obj = await updateOneProfile(user.profileID, {
            fullname: profile.fullname
          });

          if (!obj) {
            throw new Error("Profile with ID not updated");
          }

          client.emit("profileUpdated", obj);
        } catch (e) {
          client.emit("gotError", e);
        }
      });
    } catch (e) {
      Webux.log.error(e);
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  updateOneProfile,
  socket,
  route
};
