const express = require("express");
const router = express.Router();
const HttpStatus = require("http-status-codes");
const asyncHandler = require("express-async-handler");

const globals = require("../constants/globals.constant");
router.get(
  "/",
  [],
  asyncHandler(async (req, res, next) => {
    const challenge = req.query["hub.challenge"] ? req.query["hub.challenge"] : null;
    if (challenge === null) {
      throw new Error("HUB.CHALLENGE NOT FOUND");
    }
    return res.status(HttpStatus.OK).send(challenge);
  })
);




module.exports = router;
