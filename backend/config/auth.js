module.exports = {
  local: {
    username: "email",
    password: "password",
    passwordStrategy: {
      enabled: false,
      regex: "",
      message: "The password strategy is enabled and you must be compliant."
    },
    autoLogonOnRegister: true,
    autoActivate: true
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || "SHUUUT!",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "SHUUUUT!",
    accessLife: 900, // 900
    refreshLife: 86400,
    scheme: "Bearer",
    id: "_id",
    serializeUser: ["_id", "email", "profileID"]
  },
  redis: {
    mock: true,
    host: "127.0.0.1",
    port: "6379",
    auth_pass: "",
    no_ready_check: true
  }
};
