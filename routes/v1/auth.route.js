const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth.controller");
const verifyToken = require("../../middlewares/authJwt");

/**
 * @swagger
 * tags:
 *  name: Auths
 *  description: Auth management
 */

/**
 * @swagger
 * /auth:
 *  get:
 *    summary: base auth
 *    tags: [Auths]
 *    security:
 *      - BearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                user:
 *                  $ref: "#/components/schemas/UserInfo"
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StatusInfo"
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StatusInfo"
 */
router.get("/", verifyToken, authController.baseAuth);

/**
 * @swagger
 * /auth/token:
 *  post:
 *    summary: request a new pair of tokens
 *    tags: [Auths]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              refreshToken:
 *                type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                tokens:
 *                  $ref: "#/components/schemas/Tokens"
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StatusInfo"
 *      403:
 *        description: Forbiddent
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StatusInfo"
 */
router.post("/token", authController.refreshToken);

/**
 * @swagger
 * /auth/signup:
 *  post:
 *    summary: create new user
 *    tags: [Auths]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/responses/UserResponse"
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StatusInfo"
 *      422:
 *        description: Already existed
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StatusInfo"
 *
 */
router.post("/signup", authController.signUp);

/**
 * @swagger
 * /auth/signin:
 *  post:
 *    summary: create new user
 *    tags: [Auths]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/responses/UserResponse"
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StatusInfo"
 */
router.post("/signin", authController.signIn);

/**
 * @swagger
 * /auth/signout:
 *  post:
 *    summary: user log out
 *    tags: [Auths]
 *    security:
 *      - BearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StatusInfo"
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StatusInfo"
 */
router.post("/signout", verifyToken, authController.signOut);
// router.post("/confirm/:", )

module.exports = router;
