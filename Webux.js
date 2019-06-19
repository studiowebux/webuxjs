const WebuxCore = require("webux-app");
const path = require("path");

async function LoadApp() {
  // Create app
  const Webux = await new WebuxCore();

  // Load configuration
  await Webux.LoadConfiguration(path.join(__dirname, "./config"));

  // Create logger
  await Webux.CreateLogger();

  // load default values
  await Webux.LoadSeed();

  // request logger
  // todo:

  // Load security
  await Webux.LoadSecurity();

  // Load Language
  await Webux.LoadLanguage();

  // routes
  // todo:
  await Webux.app.get("/", (req, res) => {
    Webux.log.info("Hello World !");
    return res.success({ msg: "Bonjour !" });
  });

  await Webux.app.get("/lang", (req, res) => {
    Webux.log.info("Language getter");
    return res.success(
      {},
      Webux.i18n.getLocale(),
      "Return the actual language used by the backend for this request."
    );
  });

  // sockets
  // todo:

  // error handling
  await Webux.GlobalErrorHandler();

  // start server
  await Webux.StartServer();
}

module.exports = LoadApp;
