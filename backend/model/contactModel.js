const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("Contact", contactSchema);
