// ███╗   ███╗ ██████╗ ██████╗ ███████╗██╗
// ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
// ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
// ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
// ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
// ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝

/**
 * File: part_category.js
 * Author: Tommy Gingras
 * Date: 2019-07-14
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

module.exports = db => {
  const partCategorySchema = db.Schema(
    {
      partID: { type: db.Schema.Types.ObjectId, ref: "Part" },
      categoryID: { type: db.Schema.Types.ObjectId, ref: "Category" }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
  );

  return db.model("PartCategory", partCategorySchema);
};
