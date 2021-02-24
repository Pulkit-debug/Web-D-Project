module.exports.profile = function (req, res) {
  res.send("<h1> User Profile</h1>");
};

const postsController = require("./posts_controller");
module.exports.posts = postsController.posts;
