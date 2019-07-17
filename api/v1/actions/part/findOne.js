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
const { MongoID } = require("../../validations/part");
const { select } = require("../../constants/part");

// action
const findOnePart = async (partID, query) => {
  await Webux.isValid.Custom(MongoID, partID);

  const part = await Webux.db.Part.findById(partID)
    .select(query.projection || select)
    .populate("statusID")
    .populate({
      path: "userID",
      populate: {
        path: "profileID",
        model: "Profile"
      }
    })
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });
  if (!part) {
    throw Webux.errorHandler(404, "part not found");
  }

  const partCategory = await Webux.db.PartCategory.findOne({
    partID: partID
  }).populate("categoriesID");

  console.log(partCategory)

  let object = null;
  if (partCategory) {
    object = part.toObject();
    object.categories = partCategory;
  }

  return Promise.resolve(object || part);
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await findOnePart(req.params.id, req.query);
    if (!obj) {
      return next(Webux.errorHandler(404, "Part with ID not found."));
    }
    return res.success(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async partID => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await findOnePart(partID, {});
      if (!obj) {
        client.emit("gotError", "Part with ID not found");
      }

      client.emit("partFound", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  findOnePart,
  socket,
  route
};
