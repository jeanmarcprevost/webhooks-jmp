const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const RateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const HttpStatus = require("http-status-codes");
const xhub = require("express-x-hub")

require("dotenv").config({ path: "../.env" });

const config = require("./config");
const webhooks = require("./routes/facebookWebhook.route");

const router = express.Router();
const limiter = new RateLimit(config.express.limiter);
router
  .use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json({ limit: "10mb" }))
  .use(limiter)
  .use(cors())
  .use(compression())
  .use(helmet());

router.use("/webhooks", webhooks);

router.use((req, res) => {
  return res.status(HttpStatus.NOT_FOUND).json({
    error: {
      message: "Route not found v2",
      errors: []
    }
  });
});

// next is required for expressValidation
router.use((err, req, res, next) => {
  let errResponse = {
    name: err.name,
    stack: err.stack,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    extra: null,
    requestId: req.requestId
  };

  return res.status(errResponse.status).json({ error: errResponse });
});

module.exports = router;
