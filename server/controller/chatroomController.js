const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");

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
