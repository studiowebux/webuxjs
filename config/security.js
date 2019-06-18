module.exports = {
  morgan: {
    // combined, tiny, dev, common, short, json
    type: "json"
  },
  origin: "*",
  bodyParser: {
    limit: "10mb",
    extended: true
  },
  cookieParser: {
    secret: "SHUUUT!"
  }
};
