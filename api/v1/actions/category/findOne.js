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
const { MongoID } = require("../../validations/category");
const { select } = require("../../constants/category");

// action
const findOneCategory = async (categoryID, query) => {
  await Webux.isValid.Custom(MongoID, categoryID);

  const category = await Webux.db.Category.findById(categoryID)
    .select(query.projection || select)
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });
  if (!category) {
    throw Webux.errorHandler(404, "category not found");
  }
  return Promise.resolve(category);
};

// route
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
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await findOneCategory(categoryID, {});
      if (!obj) {
        client.emit("gotError", "Category with ID not found");
      }

      client.emit("categoryFound", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  findOneCategory,
  socket,
  route
};
