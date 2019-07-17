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
const { MongoID, Update } = require("../../validations/category");

// action
const updateOneCategory = async (categoryID, category) => {
  await Webux.isValid.Custom(MongoID, categoryID);
  await Webux.isValid.Custom(Update, category);

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

const socket = client => {
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

      client.emit("categoryUpdated", obj);
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
