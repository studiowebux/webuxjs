module.exports = {
  Auth: {
    time: 3600,
    maxReq: 15,
    skip: "/api/v1/auth" // if not equal that, then skip !
  },
  Global: {
    time: 60,
    maxReq: 15
  }
};
