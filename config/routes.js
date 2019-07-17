const Webux = require("webux-app"); // to access the Webux.query()
const USER = require("../api/v1/constants/user");
const PROFILE = require("../api/v1/constants/profile");
const CATEGORY = require("../api/v1/constants/category");
const PART = require("../api/v1/constants/part");
const STATUS = require("../api/v1/constants/status");

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
  },
  "/category": {
    resources: {
      "/": [
        {
          method: "get",
          middlewares: [Webux.query([], CATEGORY.select)],
          action: require(__dirname + "/../api/v1/actions/category/find").route
        },
        {
          method: "post",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/category/create")
            .route
        }
      ],
      "/:id": [
        {
          method: "get",
          middlewares: [Webux.query([], CATEGORY.select)],
          action: require(__dirname + "/../api/v1/actions/category/findOne")
            .route
        },
        {
          method: "put",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/category/update")
            .route
        },
        {
          method: "delete",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/category/remove")
            .route
        }
      ]
    }
  },
  "/status": {
    resources: {
      "/": [
        {
          method: "get",
          middlewares: [Webux.query([], STATUS.select)],
          action: require(__dirname + "/../api/v1/actions/status/find").route
        },
        {
          method: "post",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/status/create").route
        }
      ],
      "/:id": [
        {
          method: "get",
          middlewares: [Webux.query([], STATUS.select)],
          action: require(__dirname + "/../api/v1/actions/status/findOne").route
        },
        {
          method: "put",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/status/update").route
        },
        {
          method: "delete",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/status/remove").route
        }
      ]
    }
  },
  "/part": {
    resources: {
      "/": [
        {
          method: "get",
          middlewares: [Webux.query([], PART.select)],
          action: require(__dirname + "/../api/v1/actions/part/find").route
        },
        {
          method: "post",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/part/create").route
        }
      ],
      "/:id": [
        {
          method: "get",
          middlewares: [Webux.query([], PART.select)],
          action: require(__dirname + "/../api/v1/actions/part/findOne").route
        },
        {
          method: "put",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/part/update").route
        },
        {
          method: "delete",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/part/remove").route
        }
      ]
    }
  }
};
