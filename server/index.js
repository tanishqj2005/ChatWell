const express = require("express");

require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
  console.log("Mongo Connected!");
});

//Bring in the models:
require("./models/User");
require("./models/Chatroom");
require("./models/Message");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup cors:
app.use(require("cors")());

//Bring in the routes:
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));

//Setup Error Handlers
const errorHandlers = require("./handlers/errorHandlers");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

const server = app.listen(8000, () => {
  console.log("Server Initialized on port 8000");
});

const io = require("socket.io")(server);
const jwt = require("jwt-then");

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.SECRET);
    socket.userId = payload.id;
    next();
  } catch (err) {}
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);
  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });
});
