// ███╗   ███╗ ██████╗ ██████╗ ███████╗██╗
// ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
// ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
// ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
// ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
// ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝

/**
 * File: connection.js
 * Author: Tommy Gingras
 * Date: 2019-08-27
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

module.exports = db => {
  const connectionSchema = db.Schema(
    {
      type: { type: String, required: true },
      token: { type: String, required: true, unique: true, index: true },
      ip: { type: String },
      expiresIn: { type: Date },
      userID: { type: db.Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
  );

  return db.model("Connection", connectionSchema);
};
