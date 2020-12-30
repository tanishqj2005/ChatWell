const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const userController = require("../controller/userController");

router.post("/register", catchErrors(userController.register));
router.post("/login", catchErrors(userController.login));

module.exports = router;
