const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatroom: {
      type: mongoose.Schema.Types.ObjectId,
      required: "Chatroom is required!",
      ref: "Chatroom",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: "User is required!",
      ref: "User",
    },
    message: {
      type: String,
      required: "Message is required!",
    },
    image: {
      data: Buffer,
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
