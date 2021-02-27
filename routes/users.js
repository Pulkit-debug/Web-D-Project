const express = require("express");

const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");

// const postsController = require("../controllers/posts_controller");
router.get("/profile", passport.checkAuthentication, usersController.profile);
router.get("/signin", usersController.signIn);
router.get("/signup", usersController.signUp);
router.post("/create", usersController.create);
// using passport as a middleware to authenticate
router.post(
  "/createSession",
  passport.authenticate("local", {
    failureRedirect: "/users/signin",
  }),
  usersController.createSession
);
// router.get("/", usersController.user);
router.get("/signout", usersController.destorySession);
module.exports = router;
