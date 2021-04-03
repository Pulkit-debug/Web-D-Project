const Post = require("../models/posts");
const User = require("../models/user");
const Friendship = require("../models/friendship");

// console.log(req.cookies);
// res.cookie("cook", 234);

// Populate the User of each post

module.exports.home = async function (req, res) {
  try {
    // populate the user of each post
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
        populate: {
          path: "likes", // populating likes for the comments
        },
      })
      .populate("comments")
      .populate("likes"); // populating likes for the post

    let users = await User.find({});
    let friends = await Friendship.find({})
      .populate({
        path: "from_user",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "to_user",
        populate: {
          path: "user",
        },
      });

    return res.render("home", {
      title: "HomePage | Home",
      posts: posts,
      all_users: users,
      friends: friends,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
