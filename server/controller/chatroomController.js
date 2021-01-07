const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");
const Message = mongoose.model("Message");

exports.createChatroom = async (req, res) => {
  const { name } = req.body;
  const nameRegex = /^[A-Za-z\s]+$/;
  const chatroom = new Chatroom({
    name,
  });
  if (!nameRegex.test(name)) {
    throw "Invalid Chatroom Name. It can only contain alphabets!";
  }

  const chatroomExists = await Chatroom.findOne({
    name,
  });
  if (chatroomExists) {
    throw "Chatroom already exists!";
  }

  await chatroom.save();
  res.json({
    message: "Chatroom created successfully!",
  });
};

exports.getAllChatrooms = async (req, res) => {
  const chatrooms = await Chatroom.find({});
  res.json(chatrooms);
};

exports.returnMessages = async (req, res) => {
  const { chatroomId } = req.body;
  const messages = await Message.find({ chatroom: chatroomId });
  res.json({
    message: "Messages retrieved successfully!",
    allMessages: messages,
  });
};
