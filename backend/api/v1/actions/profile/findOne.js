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

// action
const findOneProfile = async (userID, query) => {
  try {
    console.log(
      "-----------------00000-0-0-0-0-0-00-0-0-0-0-0-0-00-0-0-0-0-0-0-00-0-0-0-0-0-0-00-0-0-0-0-0-0-00-0"
    );
    console.log(Webux);
    Webux.log.verbose("Find One Profile - Action Called");
    console.log(
      "-----------------00000-0-0-0-0-0-00-0-0-0-0-0-0-00-0-0-0-0-0-0-00-0-0-0-0-0-0-00-0-0-0-0-0-0-00-0"
    );
    console.log(Webux);
    Webux.log.debug("VALIDATORS");
    Webux.log.debug(webux);
    Webux.log.debug(Webux.validators);
    Webux.log.debug("VALIDTOR");
    Webux.log.debug(Webux.validators.profile.MongoID);
    Webux.log.debug("USER ID : ");
    Webux.log.debug(userID);
    await Webux.isValid.Custom(Webux.validators.profile.MongoID, userID);

    Webux.log.debug(userID);
    const myUser = await Webux.db.User.findById(userID)
      .select("profileID")
      .catch(e => {
        throw Webux.errorHandler(422, e);
      });

    if (!myUser) {
      throw Webux.errorHandler(404, "profile not found");
    }

    Webux.log.debug("User Found !");

    Webux.log.debug(myUser.profileID);
    const profile = await Webux.db.Profile.findById(myUser.profileID)
      .select(query.projection || Webux.constants.profile.select)
      .catch(e => {
        throw Webux.errorHandler(422, e);
      });
    if (!profile) {
      throw Webux.errorHandler(404, "profile not found");
    }

    Webux.log.debug("Profile Found !");

    return Promise.resolve(profile);
  } catch (e) {
    console.error(e);
    process.exit(4);
  }
};

// route
/**
 * @apiGroup Profile
 * @api {get} /api/v1/profile/:id Get one profile
 * @apiParam {string} id
 * @apiDescription Get one profile
 * @apiName Get one profile
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
 *           "body": {
 *               "_id": "5d2fb7606df7688537f20b69",
 *               "fullname": "Administrator"
 *           }
 *       }
 **/
const route = async (req, res, next) => {
  try {
    Webux.log.verbose("Find One Profile - Route Called");
    console.log(req.params.id);
    const obj = await findOneProfile(req.params.id, req.query);
    if (!obj) {
      console.log("profile not found");
      return next(Webux.errorHandler(404, "Profile with ID not found."));
    }

    console.log(obj);
    return res.success(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async accessToken => {
    try {
      Webux.log.verbose("Find One Profile - Socket Called");
      Webux.Auth.checkAuth(accessToken, async (err, user) => {
        Webux.log.debug(err);
        Webux.log.debug(user);
        if (err || !user) {
          throw err || new Error("Unauthorized");
        }

        Webux.log.verbose("UserID valid, try to get the Profile");
        Webux.log.debug([Webux.config.auth.jwt.id]);
        Webux.log.debug(user[Webux.config.auth.jwt.id]);

        const obj = await findOneProfile(
          user[Webux.config.auth.jwt.id],
          {}
        ).catch(e => {
          client.emit("gotError", e.message);
          return;
        });

        if (!obj) {
          throw new Error("Profile with ID not found");
        }

        client.emit("profileFound", obj);
      });
    } catch (e) {
      client.emit("gotError", e.message);
    }
  };
};

module.exports = {
  findOneProfile,
  socket,
  route
};
