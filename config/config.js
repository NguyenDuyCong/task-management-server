require("dotenv").config({ path: "../../.env" });

let url = process.env.APP_URL || "http://localhost:3000";

const appConfig = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  API_URL: `${url}/api`,
  API_VERSION: process.env.API_VERSION
};

const emailConfig = {
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS
};

const dbConfig = {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD
};

module.exports = { appConfig, dbConfig, emailConfig };
