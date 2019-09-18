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

// TODO : REMOVE THIS FUNCTION

"use strict";

const Webux = require("webux-app");

// action
const removeOneUser = async userID => {
  await Webux.isValid.Custom(Webux.validators.user.MongoID, userID);
  
  const userRemoved = await Webux.db.User.findByIdAndRemove(userID).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!userRemoved) {
    throw Webux.errorHandler(422, "user not removed");
  }
  return Promise.resolve(userRemoved);
};

// route
/**
 * @apiGroup User
 * @api {delete} /api/v1/user/:id Delete a user
 * @apiParam {string} id 
 * @apiDescription Delete a user
 * @apiName Delete a user
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 NO CONTENT
 */
const route = async (req, res, next) => {
  try {
    const obj = await removeOneUser(req.params.id);
    if (!obj) {
      return next(Webux.errorHandler(422, "User with ID not deleted."));
    }
    return res.deleted(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async userID => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await removeOneUser(userID);
      if (!obj) {
        client.emit("gotError", "User with ID not deleted");
      }

      client.emit("userRemoved", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  removeOneUser,
  socket,
  route
};
