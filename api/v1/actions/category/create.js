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
