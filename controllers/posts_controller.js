const mongoose = require("mongoose");
const Post = require("../models/posts");
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("Error in creating a post");
        return;
      }

      return res.redirect("back");
    }
  );
};

module.exports.destroy = function (req, res) {
  // find first if that post exists in the database or not
  Post.findById(req.params.id, function (err, post) {
    // we need to check if it's the same user who created the post
    // .id means converting the Object _id into String(mongoose gives that)
    if (post.user == req.user.id) {
      post.remove();

      Comment.deleteMany(
        {
          post: req.params.id,
        },
        function (err) {
          return res.redirect("back");
        }
      );
    } else return res.redirect("back");
  });
};

// module.exports.comment = function (err, res) {};
