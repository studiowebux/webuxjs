// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: download.js
 * Author: Tommy Gingras
 * Date: 2019-07-17
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const path = require("path");

// action
const download = async partID => {
  const part = await Webux.db.Part.findOne({ _id: partID }, "_id pictureURL").catch(
    e => {
      throw Webux.errorHandler(422, e);
    }
  );
  if (!part) {
    throw Webux.errorHandler(422, "part not found");
  }
  return Promise.resolve(part.pictureURL);
};

// route
/**
 * @apiGroup Part
 * @api {get} /api/v1/part/:id/picture For a specific Part get its picture
 * @apiParam {string} id
 * @apiDescription For a specific Part get its picture
 * @apiName For a specific Part get its picture
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      -- A picture --
 **/
const route = async (req, res, next) => {
  try {
    const pictureURL = await download(req.params.id);

    if (!pictureURL) {
      return next(Webux.errorHandler(422, "No image found."));
    }

    return res.sendFile(path.resolve(pictureURL), err => {
      if (err) {
        return next(errorHandler(404, "GET_PART_PICTURE_ERROR"));
      }
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  download,
  route
};
