const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/authJwt");

router.get("/", verifyToken, authController.baseAuth);
router.post("/token", authController.refreshToken);
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/signout", verifyToken, authController.signOut);
// router.post("/confirm/:", )

module.exports = router;
