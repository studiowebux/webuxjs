// ██████╗ ███████╗███████╗ █████╗ ██╗   ██╗██╗  ████████╗    ██╗   ██╗ █████╗ ██╗     ██╗   ██╗███████╗███████╗
// ██╔══██╗██╔════╝██╔════╝██╔══██╗██║   ██║██║  ╚══██╔══╝    ██║   ██║██╔══██╗██║     ██║   ██║██╔════╝██╔════╝
// ██║  ██║█████╗  █████╗  ███████║██║   ██║██║     ██║       ██║   ██║███████║██║     ██║   ██║█████╗  ███████╗
// ██║  ██║██╔══╝  ██╔══╝  ██╔══██║██║   ██║██║     ██║       ╚██╗ ██╔╝██╔══██║██║     ██║   ██║██╔══╝  ╚════██║
// ██████╔╝███████╗██║     ██║  ██║╚██████╔╝███████╗██║        ╚████╔╝ ██║  ██║███████╗╚██████╔╝███████╗███████║
// ╚═════╝ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝         ╚═══╝  ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝╚══════╝

/**
 * File: 04_part.js
 * Author: Tommy Gingras
 * Date: 2019-07-16
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");

const partWithoutCategories = async () => {
  const userID = await Webux.db.User.findOne(
    { email: "admin@webuxlab.com" },
    "_id"
  );
  const statusID = await Webux.db.Status.findOne({ name: "New" }, "_id");
  const part = new Webux.db.Part({
    name: "Part without categories",
    description: "Something",
    userID: userID._id,
    statusID: statusID._id
  });
  const partCreated = await part.save();

  if (!partCreated) {
    throw new Error("Part not created !");
  }

  return Promise.resolve('Default part "Part without categories" created.');
};

const partWithCategories = async () => {
  const userID = await Webux.db.User.findOne(
    { email: "user@webuxlab.com" },
    "_id"
  );
  const statusID = await Webux.db.Status.findOne({ name: "New" }, "_id");
  const categoriesID = await Webux.db.Category.find();

  categoriesID.map(item => {
    return item._id;
  });

  const part = new Webux.db.Part({
    name: "Part With Categories",
    description: "Something else",
    userID: userID._id,
    statusID: statusID
  });
  const partCreated = await part.save();

  if (!partCreated) {
    throw new Error("Part not created !");
  }

  const partCategories = new Webux.db.PartCategory({
    partID: partCreated._id,
    categoriesID: categoriesID
  });
  const partCategoriesCreated = await partCategories.save();

  if (!partCategoriesCreated) {
    throw new Error("Part not linked with the categories !");
  }

  return Promise.resolve('Default part "Part with categories" created.');
};

module.exports = Promise.all([partWithoutCategories(), partWithCategories()]);
