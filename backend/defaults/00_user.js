// ██████╗ ███████╗███████╗ █████╗ ██╗   ██╗██╗  ████████╗    ██╗   ██╗ █████╗ ██╗     ██╗   ██╗███████╗███████╗
// ██╔══██╗██╔════╝██╔════╝██╔══██╗██║   ██║██║  ╚══██╔══╝    ██║   ██║██╔══██╗██║     ██║   ██║██╔════╝██╔════╝
// ██║  ██║█████╗  █████╗  ███████║██║   ██║██║     ██║       ██║   ██║███████║██║     ██║   ██║█████╗  ███████╗
// ██║  ██║██╔══╝  ██╔══╝  ██╔══██║██║   ██║██║     ██║       ╚██╗ ██╔╝██╔══██║██║     ██║   ██║██╔══╝  ╚════██║
// ██████╔╝███████╗██║     ██║  ██║╚██████╔╝███████╗██║        ╚████╔╝ ██║  ██║███████╗╚██████╔╝███████╗███████║
// ╚═════╝ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝         ╚═══╝  ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝╚══════╝

/**
 * File: 00_user.js
 * Author: Tommy Gingras
 * Date: 2019-07-13
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("webux-app");
const bcrypt = require("bcrypt");

const administrator = async () => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync("AdminWebuxlab", salt);

  const user = new Webux.db.User({
    email: "admin@webuxlab.com",
    password: hash,
    salt: salt,
    activated: true
  });
  const userCreated = await user.save();

  if (!userCreated) {
    throw new Error("User not created !");
  }

  return Promise.resolve('Default user "admin@webuxlab.com" created.');
};

const user = async () => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync("UserWebuxlab", salt);

  const user = new Webux.db.User({
    email: "user@webuxlab.com",
    password: hash,
    salt: salt,
    activated: true
  });
  const userCreated = await user.save();

  if (!userCreated) {
    throw new Error("User not created !");
  }

  return Promise.resolve('Default user "user@webuxlab.com" created.');
};

module.exports = Promise.all([administrator(), user()]);
