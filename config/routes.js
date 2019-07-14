const Webux = require("webux-app"); // to access the Webux.query()
const USER = require("../api/v1/constants/user");
const PROFILE = require("../api/v1/constants/profile");

module.exports = {
  "/user": {
    resources: {
      "/": [
        {
          method: "get",
          middlewares: [Webux.query(USER.blacklist, USER.select)],
          action: require(__dirname + "/../api/v1/actions/user/find").route
        },
        {
          method: "post",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/user/create").route
        }
      ],
      "/:id": [
        {
          method: "get",
          middlewares: [Webux.query(USER.blacklist, USER.select)],
          action: require(__dirname + "/../api/v1/actions/user/findOne").route
        },
        {
          method: "put",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/user/update").route
        },
        {
          method: "delete",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/user/remove").route
        }
      ]
    }
  },
  "/profile": {
    resources: {
      "/": [
        {
          method: "get",
          middlewares: [Webux.query([], PROFILE.select)],
          action: require(__dirname + "/../api/v1/actions/profile/find").route
        },
        {
          method: "post",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/profile/create").route
        }
      ],
      "/:id": [
        {
          method: "get",
          middlewares: [Webux.query([], PROFILE.select)],
          action: require(__dirname + "/../api/v1/actions/profile/findOne")
            .route
        },
        {
          method: "put",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/profile/update").route
        },
        {
          method: "delete",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/profile/remove").route
        }
      ]
    }
  }
};
