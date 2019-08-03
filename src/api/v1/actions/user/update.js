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
const updateOneUser = async (userID, user) => {
  await Webux.isValid.Custom(Webux.validators.user.MongoID, userID);
  await Webux.isValid.Custom(Webux.validators.user.Update, user);

  const userUpdated = await Webux.db.User.findByIdAndUpdate(userID, user, {
    new: true
  }).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!userUpdated) {
    throw Webux.errorHandler(422, "user not updated");
  }
  return Promise.resolve(userUpdated);
};

// route
/**
 * @apiGroup User
 * @api {put} /api/v1/user/:id Update a user
 * @apiParam {string} id
 * @apiParamExample {json} Request-Example:
 *     {
 *        "user":{
 *          "email":"User01@webuxlab.com",
 *          "password": "Password"
 *        }
 *      }
 * @apiDescription Update a user
 * @apiName Update a user
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
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
    const obj = await updateOneUser(req.params.id, req.body.user);
    if (!obj) {
      return next(Webux.errorHandler(422, "User with ID not updated."));
    }
    return res.updated(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async (userID, user) => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await updateOneUser(userID, user);
      if (!obj) {
        client.emit("gotError", "User with ID not updated");
      }

      client.emit("userUpdated", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  updateOneUser,
  socket,
  route
};
