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
const updateOneCategory = async (categoryID, category) => {
  await Webux.isValid.Custom(Webux.validators.category.MongoID, categoryID);
  await Webux.isValid.Custom(Webux.validators.category.Update, category);

  const categoryUpdated = await Webux.db.Category.findByIdAndUpdate(
    categoryID,
    category,
    {
      new: true
    }
  ).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!categoryUpdated) {
    throw Webux.errorHandler(422, "category not updated");
  }
  return Promise.resolve(categoryUpdated);
};

// route
/**
 * @apiGroup Category
 * @api {put} /api/v1/category/:id Update a category
 * @apiParam {string} id
 * @apiParamExample {json} Request-Example:
 *     {
 *        "category":{
 *          "name":"Category 1",
 *          "description": "Description for category 1",
 *          "color": "ffffff"
 *        }
 *      }
 * @apiDescription Update a category
 * @apiName Update a category
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
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
    const obj = await updateOneCategory(req.params.id, req.body.category);
    if (!obj) {
      return next(Webux.errorHandler(422, "Category with ID not updated."));
    }
    return res.updated(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = (client, io) => {
  return async (categoryID, category) => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await updateOneCategory(categoryID, category);
      if (!obj) {
        client.emit("gotError", "Category with ID not updated");
      }

      io.emit("categoryUpdated", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  updateOneCategory,
  socket,
  route
};
