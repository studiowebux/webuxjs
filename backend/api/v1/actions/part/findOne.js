// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: findOne.js
 * Author: Tommy Gingras
 * Date: 2019-07-16
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");

// action
const findOnePart = async (partID, query) => {
  await Webux.isValid.Custom(Webux.validators.part.MongoID, partID);

  const part = await Webux.db.Part.findById(partID)
    .select(query.projection || Webux.constants.part.select)
    .populate("statusID")
    .populate({
      path: "userID",
      select: 'profileID',
      populate: {
        path: "profileID",
        model: "Profile",
        select: "fullname"
      }
    })
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });
  if (!part) {
    throw Webux.errorHandler(404, "part not found");
  }

  const partCategory = await Webux.db.PartCategory.findOne({
    partID: partID
  })
    .populate("categoriesID")
    .lean();

  let object = null;
  if (partCategory) {
    object = part.toObject();
    object.categories = Webux.toObject(partCategory.categoriesID);
  }

  return Promise.resolve(object || part);
};

// route
/**
 * @apiGroup Part
 * @api {get} /api/v1/part/:id Get one part
 * @apiParam {string} id
 * @apiDescription Get one part
 * @apiName Get one part
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
 *           "body": {
 *               "_id": "5d2fb7606df7688537f20b6e",
 *               "name": "Part With Categories",
 *               "description": "Something else",
 *               "userID": {
 *                   "_id": "5d2fb7606df7688537f20b68",
 *                   "email": "user@webuxlab.com",
 *                   "created_at": "2019-07-18T00:03:44.507Z",
 *                   "updated_at": "2019-07-18T00:03:44.507Z",
 *                   "__v": 0
 *               },
 *               "statusID": {
 *                   "_id": "5d2fb7606df7688537f20b6a",
 *                   "name": "New",
 *                   "description": "New product",
 *                   "color": "00ff11",
 *                   "created_at": "2019-07-18T00:03:44.607Z",
 *                   "updated_at": "2019-07-18T00:03:44.607Z",
 *                   "__v": 0
 *               },
 *               "categories": {
 *                   "5d2fb7606df7688537f20b6b": {
 *                       "_id": "5d2fb7606df7688537f20b6b",
 *                       "name": "CPU",
 *                       "description": "Central Processing Unit",
 *                       "color": "161FC4",
 *                       "created_at": "2019-07-18T00:03:44.628Z",
 *                       "updated_at": "2019-07-18T00:03:44.628Z",
 *                       "__v": 0
 *                   },
 *                   "5d2fb7606df7688537f20b6c": {
 *                       "_id": "5d2fb7606df7688537f20b6c",
 *                       "name": "GPU",
 *                       "description": "Graphics Processing Unit",
 *                       "color": "5b62d5",
 *                       "created_at": "2019-07-18T00:03:44.628Z",
 *                       "updated_at": "2019-07-18T00:03:44.628Z",
 *                       "__v": 0
 *                   }
 *               }
 *           }
 *       }
 **/
const route = async (req, res, next) => {
  try {
    const obj = await findOnePart(req.params.id, req.query);
    if (!obj) {
      return next(Webux.errorHandler(404, "Part with ID not found."));
    }
    return res.success(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async partID => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await findOnePart(partID, {});
      if (!obj) {
        client.emit("gotError", "Part with ID not found");
      }

      client.emit("partFound", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  findOnePart,
  socket,
  route
};
