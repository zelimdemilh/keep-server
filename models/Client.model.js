const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mail: String,
  password: String,
  role: {
    type: String,
    default: "client"
  }
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
