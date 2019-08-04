// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: remove.js
 * Author: Tommy Gingras
 * Date: 2019-07-16
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");

// action
const removeOneCategory = async categoryID => {
  await Webux.isValid.Custom(Webux.validators.category.MongoID, categoryID);

  const categoryRemoved = await Webux.db.Category.findByIdAndRemove(
    categoryID
  ).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!categoryRemoved) {
    throw Webux.errorHandler(422, "category not removed");
  }
  return Promise.resolve(categoryRemoved);
};

// route
/**
 * @apiGroup Category
 * @api {delete} /api/v1/category/:id Delete a category
 * @apiParam {string} id 
 * @apiDescription Delete a category
 * @apiName Delete a category
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 NO CONTENT
 */
const route = async (req, res, next) => {
  try {
    const obj = await removeOneCategory(req.params.id);
    if (!obj) {
      return next(Webux.errorHandler(422, "Category with ID not deleted."));
    }
    return res.deleted(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async categoryID => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await removeOneCategory(categoryID);
      if (!obj) {
        client.emit("gotError", "Category with ID not deleted");
      }

      client.emit("categoryRemoved", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  removeOneCategory,
  socket,
  route
};
