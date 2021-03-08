const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatars");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// we have to set the storage
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now());
    // file.fieldname is my avatar
  },
});

// statics functions/methods

userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
// just making the avatar path publically available so that I can use it from other.s
userSchema.statics.avatarPath = AVATAR_PATH;

// creating a model for this schema
const User = mongoose.model("User", userSchema);
module.exports = User;
