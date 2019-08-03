// ██╗  ██╗███████╗██╗     ██████╗ ███████╗██████╗
// ██║  ██║██╔════╝██║     ██╔══██╗██╔════╝██╔══██╗
// ███████║█████╗  ██║     ██████╔╝█████╗  ██████╔╝
// ██╔══██║██╔══╝  ██║     ██╔═══╝ ██╔══╝  ██╔══██╗
// ██║  ██║███████╗███████╗██║     ███████╗██║  ██║
// ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝

/**
 * File: upload.js
 * Author: Tommy Gingras
 * Date: 2019-03-07
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { mimeTypes } = require("../constants/upload");
const Webux = require("webux-app");

const DeleteFile = filepath => {
  return new Promise((resolve, reject) => {
    try {
      fs.stat(filepath, exist => {
        if (exist) {
          reject(Webux.errorHandler(404, "File not found"));
        }
        fs.unlink(filepath, err => {
          if (err) {
            reject(Webux.errorHandler(500, "File not deleted"));
          }

          resolve();
        });
      });
    } catch (e) {
      throw e;
    }
  });
};

const PrepareFile = (files, partID) => {
  return new Promise((resolve, reject) => {
    try {
      if (mimeTypes.indexOf(files.picture.mimetype) > -1) {
        const filename = path.join(
          Webux.config.upload.destination,
          partID + ".png"
        );
        const TMPfilename = path.join(
          Webux.config.upload.tmp,
          partID + "_TMP.png"
        );
        files.picture.mv(TMPfilename, err => {
          if (err) {
            reject(
              Webux.errorHandler(422, "Error when moving the picture", err)
            );
          }
          sharp(TMPfilename)
            .resize(Webux.config.upload.size)
            .png()
            .toFile(filename, async err => {
              if (err) {
                reject(
                  Webux.errorHandler(
                    422,
                    "Error when resizing the picture",
                    err
                  )
                );
              }

              // Delete the temporary file
              await DeleteFile(TMPfilename).catch(e => {
                reject(e);
              });

              resolve(filename);
            });
        });
      } else {
        reject(Webux.errorHandler(400, "Invalid mime type"));
      }
    } catch (e) {
      throw e;
    }
  });
};

module.exports = { PrepareFile, DeleteFile };
