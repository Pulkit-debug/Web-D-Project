const mongoose = require("mongoose");

const friendhipSchema = new mongoose.Schema({
  from_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  to_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
}, { timestamps: true });

const Friendship = mongoose.model("Friendship", friendhipSchema);
module.exports = Friendship;