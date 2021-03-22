const express = require("express");
const passport = require("passport");
const router = express.Router();
const postsApi = require("../../../controllers/api/v1/posts_api");

router.get("/", postsApi.index);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsApi.destroy
);
// setting the session to be false because I don't want session cookies to be generated

module.exports = router;