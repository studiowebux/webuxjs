module.exports = {
  origin: process.env.ORIGIN
    ? process.env.ORIGIN.split(" ")
    : ["127.0.0.1", "localhost:1337", "127.0.0.1:1337"],
  bodyParser: {
    limit: "10mb",
    extended: true
  },
  cookieParser: {
    secret: process.env.COOKIE_SECRET || "SHUUUT!"
  }
};
