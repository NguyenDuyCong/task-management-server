const express = require("express");
const router = express.Router();

const {
  genNewEmailVerification,
  verifyEmail
} = require("../../controllers/email.controller");
const verifyToken = require("../../middlewares/authJwt");

/**
 * @swagger
 * tags:
 *  name: Email
 *  description: Email managements
 */

/**
 * @swagger
 * /email/confirm:
 *  post:
 *    summary: request to verify email from user
 *    tags: [Email]
 *    security:
 *      - BearerAuth: []
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
 *              username:
 *                type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StatusInfo"
 *      403:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StatusInfo"
 */
router.post("/confirm", verifyToken, genNewEmailVerification);

/**
 * @swagger
 * /email/confirm/{code}:
 *  get:
 *    summary: confirm email
 *    tags: [Email]
 *    parameters:
 *      - in: path
 *        required: true
 *        name: code
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StatusInfo"
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StatusInfo"
 */
router.get("/confirm/:code", verifyEmail);

module.exports = router;
