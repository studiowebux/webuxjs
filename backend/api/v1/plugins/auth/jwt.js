let redis;
let client;

//initialize the Redis connection depending of the node env.
if (process.env.NODE_ENV !== "production") {
  console.log("\x1b[33m", "Webux-auth - Starting redis mock", "\x1b[0m");
  redis = require("redis-mock");
  client = redis.createClient();

  client.on("error", function(err) {
    console.error("\x1b[31m", "Webux-auth - Redis error", "\x1b[0m");
    console.error("\x1b[31m", err, "\x1b[0m");
  });
} else {
  // TODO implement the real redis instance...
}

// This function should not be use for production, Use the database to store that information.
const getConnections = userID => {
  return new Promise((resolve, reject) => {
    try {
      if (userID) {
        console.log("ID present ! ===> " + userID);

        console.log(
          "you should store the access/refresh token in a mongo DB instead, you will be able to get only the wanted tokens easily..."
        );
        client.keys("*", (err, obj) => {
          if (err || !obj || obj.length === 0) {
            return reject(err || new Error("Nothing found"));
          } else {
            let tokens = [];
            obj.forEach(token => {
              client.hgetall(token, (err, result) => {
                if (err) {
                  return reject(err);
                } else if (result) {
                  if (result.userID == userID) {
                    tokens.push({ ...result, token });
                  }
                }
              });
            });
            return resolve(tokens);
          }
        });
      } else {
        return reject(new Error("An ID must be provide"));
      }
    } catch (e) {
      throw e;
    }
  });
};

module.exports = { getConnections };
