const User = require("../models/user");

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    // if user id is present then search it in db
    User.findById(req.cookies.user_id, function (err, user) {
      if (user) {
        return res.render("user_profile", {
          title: "user Profile Page",
          user: user,
        });
      }

      return res.redirect("/users/signin");
    });
  } else {
    return res.redirect("/users/signin");
  }
  // return res.render("user_profile", {
  //   title: "user Profile Page",
  // });
};

// render sign in page
module.exports.signIn = function (req, res) {
  return res.render("user_signin", {
    title: "SignIn Page",
  });
};

// render sign up page
module.exports.signUp = function (req, res) {
  return res.render("user_signup", {
    title: "SignUp Page",
  });
};

// Get the Sign Up Data
// as soon as the data is submitted this functinon will do it's work.
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  if (
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        console.log("Error in finding user in Sign up");
        return;
      }
      if (!user) {
        User.create(req.body, function (err, user) {
          if (err) {
            console.log("error in creating user while sign up");
            return;
          }
          return res.redirect("/users/signin");
        });
      } else {
        res.redirect("back");
      }
    })
  );
};

// TODO: Get the Sign in
module.exports.createSession = function (req, res) {
  // setps to authenticate
  // find the user
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in Signing in User!!");
      return;
    }
    // handle if the user is found
    if (user) {
      // handle mismatching passwords
      if (user.password != req.body.password) {
        return res.redirect("back");
      }

      // nd handle session creation with cookies
      res.cookie("user_id", user.id);
      // console.log(user);
      return res.redirect("/users/profile");
    } else {
      // handle if the user is not found.
      return res.redirect("back");
    }
  });
};

module.exports.signout = function (req, res) {
  res.clearCookie("user_id");
  res.redirect("/users/signin");
};

// module.exports.user = function (req, res) {
//   return res.render("../views/users", {
//     title: "userPage",
//   });
// };
const postsController = require("./posts_controller");
module.exports.posts = postsController.posts;
