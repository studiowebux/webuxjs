const express = require("express");
const router = express.Router();
const app = express();

const middlewares = [
  (req, res, next) => {
    console.log("middleware 1");
    next();
  },
  (req, res, next) => {
    console.log("middleware 2");
    next();
  }
];

const action = async (req, res, next) => {
  await setTimeout(() => {
    console.log("I'm doing something great, ");
  }, 5000);

  return res.status(200).send("Bonjour !");
};

router["get"]("/", middlewares, action);

app.use("/", router);

app.listen(1337);
