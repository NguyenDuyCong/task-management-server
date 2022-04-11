const express = require("express");
const router = express.Router();

const {
  genNewEmailVerification,
  verifyEmail
} = require("../../controllers/email.controller");

router.post("/confirm", genNewEmailVerification);
router.get("/confirm/:hash", verifyEmail);

module.exports = router;
