module.exports = {
  ssl: {
    enabled: false,
    key: process.env.SSL_KEY || "", // base64 encode
    crt: process.env.SSL_CERT || "" // base64 encode
  },
  endpoint: "/api/v1",
  enterprise: "Studio Webux S.E.N.C",
  author: "Tommy Gingras",
  project: "webuxjs-demo",
  version: require("../package.json")["version"],
  port: process.env.PORT || 1337,
  cores: process.env.CORES || null,
  clusterize: process.env.CLUSTERIZE && process.env.CLUSTERIZE == "true" ? true : false,
};
