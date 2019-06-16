const express = require("express");
const app = express();

require("../index")(express);

app.get("/", (req, res) => {
  return res.success({ msg: "Hello WORLD !" }, "this is a test !", "dev ...");
});

app.get("/error", (req, res) => {
  return res.serverError();
});

app.get("/custom", (req, res) => {
  return res.custom(244, { msg: "this is a 244 code !", bla: "bla bla vbla" });
});

app.listen(1337);
