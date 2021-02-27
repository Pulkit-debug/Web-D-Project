const Post = require("../models/posts");
module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie("cook", 234);

  // Populate the User of each post
  Post.find({})
    .populate("user")
    .exec(function (err, posts) {
      return res.render("home", {
        title: "homePage",
        posts: posts,
      });
    });
};
