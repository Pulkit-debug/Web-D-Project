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

module.exports.destroy = function (req, res) {
  // check whether the post exists with comment or not?
  Comment.findById(req.params.id, function (err, comment) {
    if (comment.user == req.user.id) {
      // we also need to remove it from the array of comments inside posts
      let postId = comment.post;

      comment.remove();

      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        function (err, post) {
          return res.redirect("back");
        }
      );
    } else return res.redirect("back");
  });
};
