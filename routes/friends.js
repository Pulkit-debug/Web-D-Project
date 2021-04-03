const express = require("express");

const router = express.Router();

const friends_controller = require("../controllers/friends_controller");

router.get("/add/:id", friends_controller.addFriend);

module.exports = router;