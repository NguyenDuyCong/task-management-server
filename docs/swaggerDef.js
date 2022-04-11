const { appConfig } = require("../config/config");

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "Task Managements API Documentation",
    version: "v1"
  },
  servers: [
    {
      url: `${appConfig.API_URL}/${appConfig.API_VERSION}`
    }
  ]
};

module.exports = swaggerDef;
