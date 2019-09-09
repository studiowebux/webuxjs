const jwt = require("jsonwebtoken");
const Webux = require("webux-app");

module.exports = ()=>{return (token, next) => {
  console.log("check auth")
  console.log(token)
  jwt.verify(token, process.env.JWT_ACCESS_SECRET || "SHUUUT!", (err, decoded) => {
    if (err) {
      return next(err);
    } else {
      return next(null, decoded);
    }
  });
}
};
