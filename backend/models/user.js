// ███╗   ███╗ ██████╗ ██████╗ ███████╗██╗
// ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
// ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
// ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
// ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
// ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝

/**
 * File: user.js
 * Author: Tommy Gingras
 * Date: 2019-07-13
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

module.exports = db => {
  const userSchema = db.Schema(
    {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true, select: false },
      salt: { type: String, required: true, select: false },
      profileID: { type: db.Schema.Types.ObjectId, ref: "Profile" },
      connections: [{ type: db.Schema.Types.ObjectId, ref: "Connections" }],
      lostPasswordCode: { type: String, default: null },
      lostPasswordExpiration: { type: Date, default: null },
      activationCode: { type: String, default: null },
      activated: { type: Boolean, default: false }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
  );

  return db.model("User", userSchema);
};
