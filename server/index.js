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

//Bring in the routes:
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

app.listen(8000, () => {
  console.log("Server Initialized on port 8000");
});