module.exports = {
  ssl: {
    enabled: false,
    key: "", // absolute path
    crt: "" // absolute path
  },
  endpoint: "/api/v1",
  enterprise: "Studio Webux S.E.N.C",
  author: "Tommy Gingras",
  project: "test-webux-app",
  version: require("../package.json")["version"],
  port: 1337
};