// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: upload.js
 * Author: Tommy Gingras
 * Date: 2019-07-17
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const { PrepareFile, DeleteFile } = require("../../helpers/upload");

// action
const upload = async (partID, filename) => {
  const partUpdated = await Webux.db.Part.findByIdAndUpdate(
    partID,
    { pictureURL: filename },
    {
      new: true
    }
  ).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!partUpdated) {
    DeleteFile(filename);
    throw Webux.errorHandler(422, "part not updated");
  }
  return Promise.resolve(partUpdated);
};

// route
/**
 * @apiGroup Part
 * @api {post} /api/v1/part/:id Upload a picture for a specific part
 * @apiParam {string} id
 * @apiHeader {string} Content-Type multipart/form-data
 * @apiParamExample {json} Request-Example:
 *  -- Content-Disposition: form-data; name="picture"; filename="/Users/tgingras/Downloads/puzzle-3223941_640.jpg --
 * @apiDescription Upload a picture for a specific part
 * @apiName Upload a picture for a specific part
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
 *           "body": {
 *               "_id": "5d2fb7606df7688537f20b6d",
 *               "name": "Part without categories",
 *               "description": "Something",
 *               "userID": "5d2fb7606df7688537f20b67",
 *               "statusID": "5d2fb7606df7688537f20b6a",
 *               "created_at": "2019-07-18T00:03:44.705Z",
 *               "updated_at": "2019-07-18T00:13:27.964Z",
 *               "__v": 0,
 *               "pictureURL": "/Documents/Studiowebux/framework/webuxjs/uploads/5d2fb7606df7688537f20b6d.png"
 *           }
 *       }
 */
const route = async (req, res, next) => {
  try {
    const filename = await PrepareFile(req.files, req.params.id);

    if (!filename) {
      return next(Webux.errorHandler(422, "Part with ID not updated."));
    }

    const partUpdated = await upload(req.params.id, filename);

    if (!partUpdated) {
      return next(Webux.errorHandler(422, "Part with ID not updated."));
    }

    return res.updated(partUpdated);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  upload,
  route
};
