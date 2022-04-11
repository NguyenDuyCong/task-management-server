const router = require("express").Router();

const authRoute = require("./auth.route");
const emailRoute = require("./email.route");

router.use("/auth", authRoute);

router.use("/email", emailRoute);

module.exports = router;
