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
