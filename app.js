const express = require("express");

require("dotenv").config();
require("babel-register")({
  plugins: ["transform-es2015-destructuring", "transform-object-rest-spread"]
});

const app = express();
const port = process.env.PORT;
try {
  app.use("/v2", require("./v2/router.js"));
} catch (e) {
  console.log(e);
  throw e;
}

// see https://expressjs.com/en/guide/behind-proxies.html
// If true, the client’s IP address is understood as the left-most entry in the X-Forwarded-* header.
// If false, the app is understood as directly facing the Internet and the client’s IP address is derived from req.connection.remoteAddress. This is the default setting.
app.set("trust proxy", true);

app.listen(port, () => {
  console.log("Express server listening on port " + port);
});

process.on("uncaughtException", (reason, p) => {
  console.log("uncaughtException at: Promise ", p, " reason: ", reason);
});

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});
