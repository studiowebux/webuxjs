// This file contains the basic usage of the account activation feature.

const Webux = require("webux-app");

const activationCodeFn = (email, code) => {
  return new Promise(async (resolve, reject) => {
    try {
      const activationCode = await Webux.db.User.findOneAndUpdate(
        { email, activated: false },
        { activationCode: code }
      ).catch(e => {
        return reject(e);
      });

      if (!activationCode) {
        return reject(
          new Error(
            "Be sure that the account exists and that is not already activated"
          )
        );
      }

      console.log("*** Send the new code by EMAIL/SMS");
      console.log("Your Code : " + code);

      return resolve("Activation code sent successfully"); // this function must return something !
    } catch (e) {
      throw e;
    }
  });
};

const accountActivationFn = (email, code) => {
  return new Promise(async (resolve, reject) => {
    try {
      const activation = await Webux.db.User.findOneAndUpdate(
        { email, activationCode: code, activated: false },
        { activated: true }
      ).catch(e => {
        return reject(e);
      });

      if (!activation) {
        return reject(
          new Error(
            "Your account may already be active or an error occurs while activating your account"
          )
        );
      }

      return resolve("Account activated with success"); // this function must return something !
    } catch (e) {
      throw e;
    }
  });
};

module.exports = { activationCodeFn, accountActivationFn };
