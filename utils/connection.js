const mongoose = require("mongoose");
const { dbConfig } = require("../config/config");

const connectDB = () => {
  try {
    mongoose.connect(
      `mongodb+srv://${dbConfig.DB_USER}:${dbConfig.DB_PASSWORD}@cluster0.lx7zk.mongodb.net/taskManagement?retryWrites=true&w=majority`
    );

    console.log("database connected!");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
