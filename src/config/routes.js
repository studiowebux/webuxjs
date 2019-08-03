const Webux = require("webux-app"); // to access the Webux.query()
const fileUpload = require("express-fileupload");

module.exports = {
  "/": {
    resources: {
      "/healthcheck": [
        {
          method: "get",
          middlewares: [], // By default, this route is publicly available, you should create a middleware to protect this resource.
          action: (req, res, next) => {
            return res.success({ msg: "Pong !" });
          }
        }
      ]
    }
  },
  "/user": {
    resources: {
      "/": [
        {
          method: "get",
          middlewares: [
            Webux.query(
              Webux.constants.user.blacklist,
              Webux.constants.user.select
            )
          ],
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
          middlewares: [
            Webux.query(
              Webux.constants.user.blacklist,
              Webux.constants.user.select
            )
          ],
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
          middlewares: [Webux.query([], Webux.constants.profile.select)],
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
          middlewares: [Webux.query([], Webux.constants.profile.select)],
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
          middlewares: [Webux.query([], Webux.constants.category.select)],
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
          middlewares: [Webux.query([], Webux.constants.category.select)],
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
          middlewares: [Webux.query([], Webux.constants.status.select)],
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
          middlewares: [Webux.query([], Webux.constants.status.select)],
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
      "/:id/picture": [
        {
          method: "get",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/part/download").route
        }
      ],
      "/:id": [
        {
          method: "get",
          middlewares: [Webux.query([], Webux.constants.part.select)],
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
        },
        {
          method: "post",
          middlewares: [
            fileUpload(Webux.config.upload),
            Webux.isValid.Files(Webux.validators.part.File)
          ],
          action: require(__dirname + "/../api/v1/actions/part/upload").route
        }
      ],
      "/": [
        {
          method: "get",
          middlewares: [Webux.query([], Webux.constants.part.select)],
          action: require(__dirname + "/../api/v1/actions/part/find").route
        },
        {
          method: "post",
          middlewares: [],
          action: require(__dirname + "/../api/v1/actions/part/create").route
        }
      ]
    }
  }
};
