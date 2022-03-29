const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    default: ""
  },
  refreshToken: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("users", UserSchema);
