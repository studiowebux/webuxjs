// ███╗   ███╗ ██████╗ ██████╗ ███████╗██╗
// ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
// ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
// ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
// ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
// ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝

/**
 * File: part.js
 * Author: Tommy Gingras
 * Date: 2019-07-14
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

module.exports = db => {
  const partSchema = db.Schema(
    {
      name: { type: String, required: true, unique: true },
      description: { type: String },
      pictureURL: { type: String },
      userID: { type: db.Schema.Types.ObjectId, ref: "User" },
      statusID: { type: db.Schema.Types.ObjectId, ref: "Status" }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
  );

  return db.model("Part", partSchema);
};
