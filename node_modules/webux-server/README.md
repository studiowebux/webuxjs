# Webux-server
This module allows us to start a NodeJS server using http or https,  
you have to specify an app and some options to get it works.

# Installation

```bash
npm i --save webux-server
```

# Usage

```
const options = {
  ssl: {
    enabled: false,
    key: "", // absolute path
    crt: "" // absolute path
  },
  enterprise: "Studio Webux S.E.N.C",
  author: "Tommy Gingras",
  project: "Webux-server",
  version: "from npm package in real life !",
  port: 1337,
  logger: {
    //...
  }
};

const express = require("express");
const app = express();
const webuxserver = require("webux-server");

console.log("This is a test with a global variable !");

app.get("/", (req, res) => {
  console.log("Hello World !");
  return res.status(200).json({ msg: "Bonjour !" });
});

webuxserver(app, options); // start the server
```

