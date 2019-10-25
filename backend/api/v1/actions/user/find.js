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

// action
const findUser = async query => {
  Webux.log.verbose("Find User - Action Called");
  const users = await Webux.db.User.find({})
    .lean()
    .select(query.projection || Webux.constants.user.select)
    .limit(query.limit)
    .sort(query.sort)
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });
  if (!users || users.length === 0) {
    throw Webux.errorHandler(404, "users not found");
  }
  return Promise.resolve(Webux.toObject(users));
};

// route
/**
 * @apiGroup User
 * @api {get} /api/v1/user Get all users
 * @apiDescription Get all users
 * @apiName Get all users
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
 *           "body": {
 *               "5d2fb51ec1a7dd82a532dbc6": {
 *                   "_id": "5d2fb51ec1a7dd82a532dbc6",
 *                   "email": "user@webuxlab.com"
 *               },
 *               "5d2fb51ec1a7dd82a532dbc5": {
 *                   "_id": "5d2fb51ec1a7dd82a532dbc5",
 *                   "email": "admin@webuxlab.com",
 *                   "profileID": "5d2fb51ec1a7dd82a532dbc7"
 *               }
 *           }
 *       }
 **/
const route = async (req, res, next) => {
  try {
    Webux.log.verbose("Find User - Route Called");
    const obj = await findUser(req.query);
    if (!obj) {
      return next(Webux.errorHandler(404, "User not found."));
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
      Webux.log.verbose("Find User - Socket Called");
      const obj = await findUser({});
      if (!obj) {
        throw new Error("User not found");
      }

      client.emit("userFound", obj);
    } catch (e) {
      client.emit("gotError", e.message);
    }
  };
};

module.exports = {
  findUser,
  socket,
  route
};
