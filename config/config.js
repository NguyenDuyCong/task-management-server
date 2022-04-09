require("dotenv").config({ path: "../../.env" });

const appConfig = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  APP_URL: process.env.APP_URL || "http://localhost:3000"
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
