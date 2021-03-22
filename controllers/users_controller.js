const User = require("../models/user");
const fs = require("fs");
const path = require("path");

module.exports.profile = function (req, res) {
  // locating the user
  User.findById(req.params.id, function (err, user) {
    return res.render("user_profile", {
      title: "user Profile Page",
      profile_user: user,
    });
  });
};

module.exports.update = async function (req, res) {
  // if (req.user.id == req.params.id) {
  //   User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
  //     return res.redirect("back");
  //   });
  // } else {
  //   res.status(401).send("UnAuthorised");
  // }

  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      // I'm using the multer function because I can't parse multipart form data with body parser

      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("*****Multer Error: ", err);
        }

        // console.log(req.file);

        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          // this is saving the path of the uplaoded file into the avatar fileld in the user.

          if (
            user.avatar &&
            fs.existsSync(path.join(__dirname, "..", user.avatar))
          ) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }

          // this is saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorized!");
    return res.status(401).send("Unauthorized");
  }
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

// sign in and create a session for the user.
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Succesfully!");
  return res.redirect("/");
};

module.exports.destorySession = function (req, res) {
  req.logout();
  req.flash("success", "Logged out Successfully!");
  return res.redirect("/");
};
