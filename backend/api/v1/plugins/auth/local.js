const bcrypt = require("bcrypt");
const Webux = require("webux-app");

const deserializeFn = user => {
  return new Promise((resolve, reject) => {
    try {
      console.log(user);
      console.log(
        "Based on that ID do an API call/database to retrieve all the user information..."
      );
      return resolve({ _id: 1, fullname: "Bob", city: "Montreal" });
    } catch (e) {
      throw e;
    }
  });
};

const loginFn = (email, password, req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (email && password) {
        const user = await Webux.db.User.findOne(
          { email: email.toLowerCase(), activated: true },
          { email: 1, password: 1, salt: 1, profileID: 1 }
        ).catch(e => {
          return reject(e);
        });

        if (!user) {
          console.log("Maybe the account isn't activated");
          return reject(
            new Error(
              "Incorrect credentials or check if your account is activated"
            )
          );
        }

        bcrypt.compare(password, user.password).then(function(res) {
          if (!res) {
            return reject(new Error("Incorrect credentials"));
          }
          return resolve({
            email: user.email,
            _id: user._id,
            profileID: user.profileID
          });
        });
      }
    } catch (e) {
      throw e;
    }
  });
};

const registerFn = (email, password, req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (email && password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await Webux.db.User.create({
          email: email.toLowerCase(),
          password: hash,
          salt: salt
        }).catch(e => {
          return reject(e);
        });
        if (!newUser) {
          return reject(
            new Error("An error occur while creating your account")
          );
        }
        return resolve({
          _id: newUser._id,
          email: newUser.email
        });
      }
      return reject(new Error("You must provides credentials"));
    } catch (e) {
      throw e;
    }
  });
};

module.exports = { deserializeFn, registerFn, loginFn };
