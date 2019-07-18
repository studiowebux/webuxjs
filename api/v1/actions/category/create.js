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
const { Create } = require("../../validations/category");

// action
const createCategory = async category => {
  await Webux.isValid.Custom(Create, category);

  const categoryCreated = await Webux.db.Category.create(category).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!categoryCreated) {
    throw Webux.errorHandler(422, "category not created");
  }

  return Promise.resolve(categoryCreated);
};

// route
/**
 * @apiGroup Category
 * @api {post} /api/v1/category Create a category
 * @apiParamExample {json} Request-Example:
 *     {
 *        "category":{
 *          "name":"Category 1",
 *          "description": "Description for category 1",
 *          "color": "ffffff"
 *        }
 *      }
 * @apiDescription Create a category
 * @apiName Create a category
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 CREATED
 *     {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 201,
 *           "body": {
 *               "_id": "5d2fafa9f52ba67d93c3b741",
 *               "name": "Category 1",
 *               "description": "Description for category 1",
 *               "color": "ffffff",
 *               "created_at": "2019-07-17T23:30:49.819Z",
 *               "updated_at": "2019-07-17T23:30:49.819Z",
 *               "__v": 0
 *           }
 *       }
 */
const route = async (req, res, next) => {
  try {
    const obj = await createCategory(req.body.category);
    if (!obj) {
      return next(Webux.errorHandler(422, "Category not created"));
    }
    return res.created(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth
const socket = client => {
  return async category => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await createCategory(category);
      if (!obj) {
        client.emit("gotError", "Category not created");
      }

      client.emit("categoryCreated", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  createCategory,
  socket,
  route
};
