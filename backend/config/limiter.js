module.exports = {
  Auth: {
    time: 600,
    maxReq: 20,
    skip: "/api/v1/auth" // if not contains that, then skip !
  },
  Global: {
    time: 60,
    maxReq: 150,
    skip: "/api/v1" // if not contains that, then skip !
  }
};
