const passport = require("passport");

const LocalStrategy = require("passport-local");

const User = require("../models/user");

// telling passport to use passport local stragegy
// authentication middleware will use it.
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      // find a user and establish it's/ identiy
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          req.flash("error", err);
          return done(err);
        }
        if (!user || user.password != password) {
          req.flash("error", "Invalid Username/Password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

// Serializing the user to decide which user is to be kept in the cookies

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deseriaizing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user in db using passport");
      return done(err);
    }

    return done(null, user);
  });
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in then pass on the request to the next function which is "controller's action"
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in

  return res.redirect("/users/signin");
};

// once the user is signed in
passport.setAuthenticatedUser = function (req, res, next) {
  // req.user contains the current signed in user from the sessino cookie and /// we are just sending this to locals for views
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

// passport.isSignedIn = function (req, res, next) {
//   if (res.locals.user) {
//     return res.redirect("/users/profile");
//   }
//   next();
// };

module.exports = passport;
