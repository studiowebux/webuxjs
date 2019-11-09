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

const Webux = require("@studiowebux/app");

// action
const findOneUser = async (userID, query) => {
  Webux.log.verbose("Find One User - Action Called");
  await Webux.isValid.Custom(Webux.validators.user.MongoID, userID);
  const user = await Webux.db.User.findById(userID)
    .select(query.projection || Webux.constants.user.select)
    .populate("profileID")
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });
  if (!user) {
    throw Webux.errorHandler(404, "user not found");
  }
  return Promise.resolve(user);
};

// route
/**
 * @apiGroup User
 * @api {get} /api/v1/user/:id Get one user
 * @apiParam {string} id
 * @apiDescription Get one user
 * @apiName Get one user
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *         "message": "",
 *         "devMessage": "",
 *         "success": true,
 *         "code": 200,
 *         "body": {
 *             "_id": "5d2fb51ec1a7dd82a532dbc5",
 *             "email": "admin@webuxlab.com",
 *             "profileID": {
 *                 "_id": "5d2fb51ec1a7dd82a532dbc7",
 *                 "fullname": "Administrator",
 *                 "created_at": "2019-07-17T23:54:06.684Z",
 *                 "updated_at": "2019-07-17T23:54:06.684Z",
 *                 "__v": 0
 *             }
 *         }
 *       }
 **/
const route = async (req, res, next) => {
  try {
    Webux.log.verbose("Find One User - Route Called");
    const obj = await findOneUser(req.params.id, req.query);
    if (!obj) {
      return next(Webux.errorHandler(404, "User with ID not found."));
    }
    return res.success(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async userID => {
    try {
      Webux.log.verbose("Find One User - Socket Called");
      const obj = await findOneUser(userID, {});
      if (!obj) {
        throw new Error("User with ID not found");
      }

      client.emit("userFound", obj);
    } catch (e) {
      client.emit("gotError", e.message);
    }
  };
};

module.exports = {
  findOneUser,
  socket,
  route
};
