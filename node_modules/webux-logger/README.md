# Webux Logger
The module simplify the usage of winston with multiple transports
- console
- files
- logstash
  
it uses winston 3.x  
Notice: to get logstash working, you will need a ELK Stack, check the example folder for an example.  

# Installation
```bash
npm i --save webux-logger
```

# Usage

```
const options = {
  application_id: "Test01",
  forceConsole: true,
  logstash: {
    host: "127.0.0.1",
    port: "5000" // udp only !
  },
  filenames: {
    error: "log/error.log",
    warn: "log/warn.log",
    info: "log/info.log",
    verbose: "log/verbose.log",
    debug: "log/debug.log",
    silly: "log/silly.log"
  },
  blacklist: ["password"]
};
```

Create a constant to define all the winston parameters.  
- application_id: specify which backend is sending the message.
- forceConsole: it force to get the log's output to the console even in production.
- logstash: set both parameters to get a logstash redirection, remember, the port must be UDP. (to disable logstash, just delete the option)
- filenames: for each logging level, you can define a file.
- blacklist: this array contains the word to remove from the logs.

if you provide no options, only the console output will work and only in development mode.  

## Example

```
const webuxlogger = require("webux-logger")(options);

webuxlogger.error("An error occur");
webuxlogger.info("An info occur");
webuxlogger.debug("An debug occur");
webuxlogger.warn({
  message: "watch out ! this is a json !",
  success: false,
  status: 500
});

```

Console Output:  

```
{"message":"An error occur","level":"error","label":"Test01","timestamp":"2019-06-13T01:48:06.700Z"}
{"message":"An info occur","level":"info","label":"Test01","timestamp":"2019-06-13T01:48:06.705Z"}
{"message":"An debug occur","level":"debug","label":"Test01","timestamp":"2019-06-13T01:48:06.706Z"}
{"message":"watch out ! this is a json !","success":false,"status":500,"level":"warn","label":"Test01","timestamp":"2019-06-13T01:48:06.706Z"}
```

# Package used

Check the package.json to get which package I used and which version, this module is ONLY a wrapper.  

