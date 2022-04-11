const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config();
const routes = require("./routes/v1/index");
const connectDB = require("./utils/connection");
const { appConfig } = require("./config/config");

app.use(cors());
app.use(express.json());

// connect to database
connectDB();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(`/api/${appConfig.API_VERSION}`, routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
