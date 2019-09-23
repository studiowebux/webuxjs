"use strict";

const Webux = require("webux-app");
const jwt = require("jsonwebtoken");

/**
 * This function is used to authenticate the user using the socket.io.
 * The function also check if the access token is not blacklisted in Redis.
 * @param {string} accessToken
 * @param {Function} callback
 * @returns an error or a user decoded from the jwt token.
 */
function isAuth(accessToken, callback) {
  try {
    jwt.verify(accessToken, Webux.config.auth.jwt.accessSecret, (err, user) => {
      if (err || !user) {
        Webux.log.error("No user found...");
        return callback(err || new Error("No user found"));
      }

      Webux.log.debug("Check token...");
      Webux.log.debug(accessToken);
      Webux.log.debug(user[Webux.config.auth.jwt.id]);

      Webux.Auth.CheckToken(
        accessToken,
        user[Webux.config.auth.jwt.id],
        Webux.log
      )
        .then(() => {
          Webux.log.debug("Token valid");
          return callback(null, user);
        })
        .catch(e => {
          Webux.log.debug("invalid token...");
          return callback(e);
        });
    });
  } catch (e) {
    Webux.log.error(e);
    throw e;
  }
}

module.exports = isAuth;
