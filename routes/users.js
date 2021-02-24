const express = require("express");

const router = express.Router();

const usersController = require("../controllers/users_controller");
// const postsController = require("../controllers/posts_controller");
router.get("/profile", usersController.profile);
router.get("/posts", usersController.posts);
router.get("/signin", usersController.signIn);
router.get("/signup", usersController.signUp);
router.post("/create", usersController.create);
router.post("/createSession", usersController.createSession);
// router.get("/", usersController.user);

module.exports = router;
