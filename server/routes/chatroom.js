const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const chatroomController = require("../controller/chatroomController");

const auth = require("../middleware/auth");
router.post("/", auth, catchErrors(chatroomController.createChatroom));
router.post(
  "/getMessages",
  auth,
  catchErrors(chatroomController.returnMessages)
);
router.get("/", auth, catchErrors(chatroomController.getAllChatrooms));

module.exports = router;
