const mongoose = require("mongoose");
const User = mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailRegex = /[@gmail.com|@yahoo.com|@hotmail.com|@iitj.ac.in]$/;

  if (!emailRegex.test(email)) throw "Email is not supported from your domain";
  if (password.length < 6) throw "Password must be atleast 6 characters long!";

  const userExists = await User.findOne({
    email,
  });
  if (userExists) throw "User already exists!";

  const user = new User({
    name,
    email,
    password: sha256(password + process.env.SALT),
  });
  await user.save();
  res.json({
    message: "User [" + name + "] registered sucessfully.",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password: sha256(password + process.env.SALT),
  });
  if (!user) throw "User and password did not match!";
  const token = await jwt.sign({ id: user.id }, process.env.SECRET);
  res.json({
    message: "User logged in Successfully!",
    token,
  });
};
