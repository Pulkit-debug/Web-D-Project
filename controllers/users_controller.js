module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "user Profile Page",
  });
};

// module.exports.user = function (req, res) {
//   return res.render("../views/users", {
//     title: "userPage",
//   });
// };
const postsController = require("./posts_controller");
module.exports.posts = postsController.posts;
