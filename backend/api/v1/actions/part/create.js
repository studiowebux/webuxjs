// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: create.js
 * Author: Tommy Gingras
 * Date: 2019-07-16
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const { findOnePart } = require("./findOne");

// action

const createPart = async part => {
  await Webux.isValid.Custom(Webux.validators.part.Create, part);

  const partCreated = await Webux.db.Part.create(part).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!partCreated) {
    throw Webux.errorHandler(422, "part not created");
  }

  const CategoriesLinked = await Webux.db.PartCategory.create({
    partID: partCreated._id,
    categoriesID: part.categoriesID
  }).catch(e => {
    throw Webux.errorHandler(422, e);
  });

  if (!CategoriesLinked) {
    throw Webux.errorHandler(422, "Categories not linked");
  }

  const newPart = await findOnePart(partCreated._id.toString(), {}).catch(e => {
    throw Webux.errorHandler(422, e);
  });

  if (!newPart) {
    throw Webux.errorHandler(422, "Fail to get the newly created part");
  }

  return Promise.resolve(newPart);
};

// route
/**
 * @apiGroup Part
 * @api {post} /api/v1/part Create a part
 * @apiParamExample {json} Request-Example:
 *     {
 *        "part":{
 *          "name":"Part 1",
 *          "description": "Description for part 1",
 *          "userID": "5d2faf0cf52ba67d93c3a543",
 *          "statusID": "5d2faf0cf52ba67d93c3b766",
 *          "categoriesID": ["5d2faf0cf52ba67d93c3b738","5d2faf0cf52ba67d93c3b739"]
 *        }
 *      }
 * @apiDescription Create a part
 * @apiName Create a part
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 CREATED
 *     {
 *         "message": "",
 *         "devMessage": "",
 *         "success": true,
 *         "code": 201,
 *         "body": {
 *             "_id": "5d2fb10d59f0587ef1dd06ef",
 *             "name": "Part 1",
 *             "description": "Description for part 1",
 *             "userID": "5d2faf0cf52ba67d93c3a543",
 *             "statusID": "5d2faf0cf52ba67d93c3b766",
 *             "created_at": "2019-07-17T23:36:45.467Z",
 *             "updated_at": "2019-07-17T23:36:45.467Z",
 *             "__v": 0
 *         }
 *     }
 **/
const route = async (req, res, next) => {
  try {
    const obj = await createPart(req.body.part);
    if (!obj) {
      return next(Webux.errorHandler(422, "Part not created"));
    }
    return res.created(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth
const socket = (client, io) => {
  return async part => {
    try {
      const obj = await createPart(part);
      if (!obj) {
        throw new Error("Part not created");
      }

      io.emit("partCreated", obj);
    } catch (e) {
      client.emit("gotError", e.message);
    }
  };
};

module.exports = {
  createPart,
  socket,
  route
};
