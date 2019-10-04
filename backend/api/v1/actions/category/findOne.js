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
const findOneCategory = async (categoryID, query) => {
  await Webux.isValid.Custom(Webux.validators.category.MongoID, categoryID);

  const category = await Webux.db.Category.findById(categoryID)
    .select(query.projection || Webux.constants.category.select)
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });
  if (!category) {
    throw Webux.errorHandler(404, "category not found");
  }
  return Promise.resolve(category);
};

// route
/**
 * @apiGroup Category
 * @api {get} /api/v1/category/:id Get one category
 * @apiParam {string} id
 * @apiDescription Get one category
 * @apiName Get one category
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
 *           "body": {
 *               "_id": "5d2fb7606df7688537f20b6b",
 *               "name": "CPU",
 *               "description": "Central Processing Unit",
 *               "color": "161FC4"
 *           }
 *       }
 **/
const route = async (req, res, next) => {
  try {
    const obj = await findOneCategory(req.params.id, req.query);
    if (!obj) {
      return next(Webux.errorHandler(404, "Category with ID not found."));
    }
    return res.success(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async categoryID => {
    try {
      const obj = await findOneCategory(categoryID, {});
      if (!obj) {
        throw new Error("Category with ID not found");
      }

      client.emit("categoryFound", obj);
    } catch (e) {
      client.emit("gotError", e.message);
    }
  };
};

module.exports = {
  findOneCategory,
  socket,
  route
};
