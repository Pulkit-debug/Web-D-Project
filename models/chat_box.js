const mongoose = require("mongoose");

const chatboxSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    messages: [
        {
            type: String,
        },
    ],
});

const ChatboxSchema = mongoose.model("ChatboxSchema", chatboxSchema);
module.exports = ChatboxSchema;