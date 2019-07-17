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
const { Create } = require("../../validations/part");

// action
const createPart = async part => {
  await Webux.isValid.Custom(Create, part);

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

  return Promise.resolve(partCreated);
};

// route
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
const socket = client => {
  return async part => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await createPart(part);
      if (!obj) {
        client.emit("gotError", "Part not created");
      }

      client.emit("partCreated", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  createPart,
  socket,
  route
};
