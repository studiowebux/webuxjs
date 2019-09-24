module.exports = {
  origin: process.env.ORIGIN
    ? process.env.ORIGIN.split(" ")
    : [
        "127.0.0.1",
        "localhost:8080",
        "127.0.0.1:8080",
        "http://localhost:8080",
        "http://192.168.2.10:8080",
        "192.168.2.10:8080"
      ],
  bodyParser: {
    limit: "10mb",
    extended: true
  },
  cookieParser: {
    secret: process.env.COOKIE_SECRET || "SHUUUT!"
  },
  trustProxy: true,
  allowedMethods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  allowedCredentials: true,
  allowedHeaders:
    "Origin,X-Requested-with,Accept,Authorization,Content-Type,Accept-Language"
};
