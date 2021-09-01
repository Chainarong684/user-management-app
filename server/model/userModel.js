const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  gender: String,
  status: String,
});

const Userdb = mongoose.model("userdb", userSchema);

module.exports = Userdb