# Webux-app
This module contains the definition of the whole app, it uses global variable to simplify the app structure.

# Installation
```
npm i --save webux-app
```

# Usage
```
const options = {
  logger: {
    application_id: "Test01",
    forceConsole: true,
    logstash: {
      host: "127.0.0.1",
      port: "5000" // udp only !
    },
    filenames: {
      error: "log/error.log"
    },
    blacklist: ["password"]
  }
};

const { CreateApp, Webux } = require("webux-app");

CreateApp(options);
// CreateApp(); // No options will be provide...

Webux.log.info("This is a test with a global variable !");

```
