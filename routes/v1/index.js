const router = require("express").Router();

const authRoute = require("./auth.route");
const emailRoute = require("./email.route");
const docsRoute = require("./docs.route");

router.use("/auth", authRoute);

router.use("/email", emailRoute);

router.use("/docs", docsRoute);

module.exports = router;
