const mongoose = require("mongoose");
const Comment = require("../models/comment");
const Post = require("../models/posts");

module.exports.create = function (req, res) {
  Post.findById(req.body.post, function (err, post) {
    // this req.body.post we passed on from home.ejs as hidden input

    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          // handle error

          post.comments.push(comment);
          post.save();

          res.redirect("/");
        }
      );
    }
  });
};
