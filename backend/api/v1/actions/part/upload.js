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

const Webux = require("@studiowebux/app");

// action
const upload = async (partID, file) => {
  Webux.log.verbose("Upload a Picture - Action Called");
  const oldPicture = await Webux.db.Part.findById(partID)
    .select("pictureURL")
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });

  if (oldPicture && oldPicture.pictureURL) {
    Webux.fileUpload.DeleteFile(oldPicture.pictureURL);
  }

  const filename = await Webux.fileUpload.PrepareFile(
    Webux.config.upload,
    file,
    partID
  );

  if (!filename) {
    return next(Webux.errorHandler(422, "Part with ID not updated."));
  }

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
    Webux.fileUpload.DeleteFile(filename);
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
    Webux.log.verbose("Upload a Picture - Route Called");
    const partUpdated = await upload(req.params.id, req.files);

    if (!partUpdated) {
      return next(Webux.errorHandler(422, "Part with ID not updated."));
    }

    return res.updated(
      partUpdated,
      "Picture Uploaded successfully",
      "If exists the old one has been removed."
    );
  } catch (e) {
    next(e);
  }
};

module.exports = {
  upload,
  route
};
