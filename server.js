const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const authRoute = require("./routes/auth.route");
const emailRoute = require("./routes/email.route");
const connectDB = require("./utils/connection");

app.use(cors());
app.use(express.json());

// connect to database
connectDB();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/auth", authRoute);

app.use("/api/email", emailRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
