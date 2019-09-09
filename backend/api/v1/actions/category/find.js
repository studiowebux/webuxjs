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

const Webux = require("webux-app");

// action
const findCategory = async query => {
  const categories = await Webux.db.Category.find({})
    .lean()
    .select(query.projection || Webux.constants.category.select)
    .limit(query.limit)
    .sort(query.sort)
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });
  if (!categories || categories.length === 0) {
    throw Webux.errorHandler(404, "categories not found");
  }
  return Promise.resolve(Webux.toObject(categories));
};

// route
/**
 * @apiGroup Category
 * @api {get} /api/v1/category Get all categories
 * @apiDescription Get all categories
 * @apiName Get all categories
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
 *           "body": {
 *               "5d2fb51ec1a7dd82a532dbc9": {
 *                   "_id": "5d2fb51ec1a7dd82a532dbc9",
 *                   "name": "CPU",
 *                   "description": "Central Processing Unit",
 *                   "color": "161FC4"
 *               },
 *               "5d2fb51ec1a7dd82a532dbca": {
 *                   "_id": "5d2fb51ec1a7dd82a532dbca",
 *                   "name": "GPU",
 *                   "description": "Graphics Processing Unit",
 *                   "color": "5b62d5"
 *               }
 *           }
 *       }
 */
const route = async (req, res, next) => {
  try {
    const obj = await findCategory(req.query);
    if (!obj) {
      return next(Webux.errorHandler(404, "Category not found."));
    }
    return res.success(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  console.log("caleed !!")
  return async () => {
    try {
      console.log("Hum this is strange in both cases...")
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await findCategory({});
      if (!obj) {
        client.emit("gotError", "Category not found");
      }

      client.emit("categoryFound", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  findCategory,
  socket,
  route
};
