const express = require("express");
const router = express.Router();
const HttpStatus = require("http-status-codes");
const asyncHandler = require("express-async-handler");

router.get(
  "/",
  [],
  asyncHandler(async (req, res) => {
    const challenge = req.query["hub.challenge"] ? req.query["hub.challenge"] : null;
    if (challenge === null) {
      throw new Error("HUB.CHALLENGE NOT FOUND");
    }

    const token = req.query["hub.verify_token"] ? req.query["hub.verify_token"] : null;
    if (token === null) {
      throw new Error("HUB.TOKEN NOT FOUND");
    }

    return res.status(HttpStatus.OK).send(challenge);
  })
);

router.post('/', async (req, res) => {
  if (!req.isXHubValid()) {
    throw new Error("X-HUB NOT VALID");
  }
  console.log('Facebook request body:', req.body.entry[0].changes);

  console.log('here update');
  // Process the Facebook updates here
  res.sendStatus(HttpStatus.OK);
});

module.exports = router;
