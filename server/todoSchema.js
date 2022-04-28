const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
  },
  email: String,
  password: String,
  companyName: String,
});

module.exports = todoSchema;
