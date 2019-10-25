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
const removeOnePart = async (partID, userID) => {
  Webux.log.verbose("Remove One Part - Action Called");
  await Webux.isValid.Custom(Webux.validators.part.MongoID, partID);

  const partRemoved = await Webux.db.Part.findOneAndRemove({
    _id: partID,
    userID: userID
  }).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!partRemoved) {
    throw Webux.errorHandler(422, "part not removed");
  }

  if(partRemoved.pictureURL){
    Webux.fileUpload.DeleteFile(partRemoved.pictureURL);
  }

  const partCategoriesRemoved = await Webux.db.PartCategory.findOneAndRemove({
    partID
  }).catch(e => {
    throw Webux.errorHandler(422, e);
  });

  if (!partCategoriesRemoved) {
    throw Webux.errorHandler(422, "part categories not removed");
  }
  return Promise.resolve(partRemoved);
};

// route
/**
 * @apiGroup Part
 * @api {delete} /api/v1/part/:id Delete a part
 * @apiParam {string} id
 * @apiDescription Delete a part
 * @apiName Delete a part
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 NO CONTENT
 */
const route = async (req, res, next) => {
  try {
    Webux.log.verbose("Remove One Part - Route Called");
    const obj = await removeOnePart(req.params.id, req.user._id);
    if (!obj) {
      return next(Webux.errorHandler(422, "Part with ID not deleted."));
    }
    return res.deleted(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = (client, io) => {
  return async partID => {
    try {
      Webux.log.verbose("Remove One Part - Socket Called");
      const obj = await removeOnePart(partID, client.user._id);
      if (!obj) {
        throw new Error("Part with ID not deleted");
      }

      io.emit("partRemoved", obj);
    } catch (e) {
      client.emit("gotError", e.message);
    }
  };
};

module.exports = {
  removeOnePart,
  socket,
  route
};
