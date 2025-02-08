const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // ✅ Make password optional
  googleId: { type: String, unique: true, sparse: true }, // ✅ Store Google ID
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
