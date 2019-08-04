// ██████╗ ███████╗███████╗ █████╗ ██╗   ██╗██╗  ████████╗    ██╗   ██╗ █████╗ ██╗     ██╗   ██╗███████╗███████╗
// ██╔══██╗██╔════╝██╔════╝██╔══██╗██║   ██║██║  ╚══██╔══╝    ██║   ██║██╔══██╗██║     ██║   ██║██╔════╝██╔════╝
// ██║  ██║█████╗  █████╗  ███████║██║   ██║██║     ██║       ██║   ██║███████║██║     ██║   ██║█████╗  ███████╗
// ██║  ██║██╔══╝  ██╔══╝  ██╔══██║██║   ██║██║     ██║       ╚██╗ ██╔╝██╔══██║██║     ██║   ██║██╔══╝  ╚════██║
// ██████╔╝███████╗██║     ██║  ██║╚██████╔╝███████╗██║        ╚████╔╝ ██║  ██║███████╗╚██████╔╝███████╗███████║
// ╚═════╝ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝         ╚═══╝  ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝╚══════╝

/**
 * File: 03_category.js
 * Author: Tommy Gingras
 * Date: 2019-07-16
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");

const CPU = async () => {
  const category = new Webux.db.Category({
    name: "CPU",
    description: "Central Processing Unit",
    color: "161FC4"
  });
  const categoryCreated = await category.save();

  if (!categoryCreated) {
    throw new Error("Category not created !");
  }

  return Promise.resolve('Default category "CPU" created.');
};

const GPU = async () => {
  const category = new Webux.db.Category({
    name: "GPU",
    description: "Graphics Processing Unit",
    color: "5b62d5"
  });
  const categoryCreated = await category.save();

  if (!categoryCreated) {
    throw new Error("Category not created !");
  }

  return Promise.resolve('Default category "GPU" created.');
};

module.exports = Promise.all([CPU(), GPU()]);
