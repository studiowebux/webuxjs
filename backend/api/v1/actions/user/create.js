// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: create.js
 * Author: Tommy Gingras
 * Date: 2019-07-13
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("@studiowebux/app");

// action
const createUser = async user => {
  Webux.log.verbose("Create User - Action Called");
  await Webux.isValid.Custom(Webux.validators.user.Create, user);

  const userCreated = await Webux.db.User.create(user).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!userCreated) {
    throw Webux.errorHandler(422, "user not created");
  }

  let cleaned = userCreated.toObject();
  delete cleaned["password"];

  return Promise.resolve(cleaned);
};

// route
/**
 * @apiGroup User
 * @api {post} /api/v1/user Create a user
 * @apiParamExample {json} Request-Example:
 *     {
 *        "user":{
 *          "email":"User01@webuxlab.com",
 *          "password": "Password"
 *        }
 *      }
 * @apiDescription Create a user
 * @apiName Create a user
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 CREATED
 *       {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 201,
 *           "body": {
 *               "_id": "5d2fb25559f0587ef1dd06f4",
 *               "email": "user01@webuxlab.com",
 *               "created_at": "2019-07-17T23:42:13.898Z",
 *               "updated_at": "2019-07-17T23:42:13.898Z",
 *               "__v": 0
 *           }
 *       }
 */
const route = async (req, res, next) => {
  try {
    Webux.log.verbose("Create User - Route Called");
    const obj = await createUser(req.body.user);
    if (!obj) {
      return next(Webux.errorHandler(422, "User not created"));
    }
    return res.created(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth
const socket = client => {
  return async user => {
    try {
      Webux.log.verbose("Create User - Socket Called");
      const obj = await createUser(user);
      if (!obj) {
        throw new Error("User not created");
      }

      client.emit("userCreated", obj);
    } catch (e) {
      client.emit("gotError", e.message);
    }
  };
};

module.exports = {
  createUser,
  socket,
  route
};
