// ███╗   ███╗ ██████╗ ██████╗ ███████╗██╗
// ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
// ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
// ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
// ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
// ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝

/**
 * File: status.js
 * Author: Tommy Gingras
 * Date: 2019-07-14
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

module.exports = db => {
  const statusSchema = db.Schema(
    {
      name: { type: String, required: true, unique: true },
      description: { type: String },
      color: { type: String }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
  );

  return db.model("Status", statusSchema);
};
