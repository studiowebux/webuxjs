// This file contains the basic usage of the account password feature.

const Webux = require("webux-app");
const bcrypt = require("bcrypt");

const lostPasswordFn = (email, code) => {
  return new Promise(async (resolve, reject) => {
    try {
      const setCode = await Webux.db.User.findOneAndUpdate(
        { email },
        { lostPasswordCode: code }
      ).catch(e => {
        return reject(e);
      });

      if (!setCode) {
        return reject(
          new Error(
            "An error occur while sending the password recovery procedure"
          )
        );
      }

      Webux.log.debug("*** Send A MAIL/SMS containing the code");

      Webux.log.debug("Your code : " + code);

      return resolve("Password recovery procedure sent successfully"); // this function must return something !
    } catch (e) {
      throw e;
    }
  });
};

const retrievePasswordFn = (email, code, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const recoverPassword = await Webux.db.User.findOneAndUpdate(
        { email, lostPasswordCode: code },
        {
          password: hash,
          salt: salt
        }
      ).catch(e => {
        return reject(e);
      });

      if (!recoverPassword) {
        return reject(new Error("An error occur while updating the password"));
      }
      return resolve("Password Updated"); // this function must return something !
    } catch (e) {
      throw e;
    }
  });
};

module.exports = {
  lostPasswordFn,
  retrievePasswordFn
};
