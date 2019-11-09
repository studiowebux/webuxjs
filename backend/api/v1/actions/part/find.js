// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: find.js
 * Author: Tommy Gingras
 * Date: 2019-07-16
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("@studiowebux/app");

// action
const findPart = async query => {
  Webux.log.verbose("Find Part - Action Called");
  const filter = query.filter || {};
  const parts = await Webux.db.Part.find(filter)
    .lean()
    .select(query.projection || Webux.validators.part.select)
    .limit(query.limit)
    .populate("statusID", "name color")
    .populate({
      path: "userID",
      select: "profileID",
      populate: {
        path: "profileID",
        model: "Profile",
        select: "fullname"
      }
    })
    .sort(query.sort)
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });
  if (!parts || parts.length === 0) {
    throw Webux.errorHandler(404, "parts not found");
  }

  return Promise.resolve(Webux.toObject(parts));
};

// route
/**
 * @apiGroup Part
 * @api {get} /api/v1/part Get all parts
 * @apiDescription Get all parts
 * @apiName Get all parts
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
 *           "body": {
 *               "5d2fb51ec1a7dd82a532dbcb": {
 *                   "_id": "5d2fb51ec1a7dd82a532dbcb",
 *                   "name": "Part without categories",
 *                   "description": "Something",
 *                   "userID": "5d2fb51ec1a7dd82a532dbc5",
 *                   "statusID": "5d2fb51ec1a7dd82a532dbc8"
 *               },
 *               "5d2fb51ec1a7dd82a532dbcc": {
 *                   "_id": "5d2fb51ec1a7dd82a532dbcc",
 *                   "name": "Part With Categories",
 *                   "description": "Something else",
 *                   "userID": "5d2fb51ec1a7dd82a532dbc6",
 *                   "statusID": "5d2fb51ec1a7dd82a532dbc8"
 *               }
 *           }
 *       }
 **/
const route = async (req, res, next) => {
  try {
    Webux.log.verbose("Find Part - Route Called");
    const obj = await findPart(req.query);
    if (!obj) {
      return next(Webux.errorHandler(404, "Part not found."));
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
      Webux.log.verbose("Find Part - Socket Called");
      const obj = await findPart({});
      if (!obj) {
        throw new Error("Part not found");
      }

      client.emit("partFound", obj);
    } catch (e) {
      client.emit("gotError", e.message);
    }
  };
};

module.exports = {
  findPart,
  socket,
  route
};
