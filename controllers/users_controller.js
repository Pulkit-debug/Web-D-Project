const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "user Profile Page",
  });
};

// render sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_signin", {
    title: "SignIn Page",
  });
};

// render sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
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
  return res.redirect("/users/profile");
};

module.exports.destorySession = function (req, res) {
  req.logout();
  return res.redirect("/");
};
