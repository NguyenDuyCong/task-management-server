const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: String,
  label: String,
  description: String,
  members: {
    type: Array,
    default: []
  },
  deadline: String
});

module.exports = mongoose.model("tasks", TaskSchema);
