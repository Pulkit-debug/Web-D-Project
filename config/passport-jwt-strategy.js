const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
// this will help us extract the jwt from the header
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

// this will help us to encryp and decrypt
// header is alist of keys and it has a akey called authorization
let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "getSocial",
};

passport.use(
  new JWTStrategy(opts, function (jwtPayLoad, done) {
    // we will be storing the complete user information in the payload information.
    User.findById(jwtPayLoad._id, function (err, user) {
      if (err) {
        console.log("Error in finding user from JWT");
        return;
      }

      if (user) {
        return done(null, user);
      } else return done(null, false);
    });
  })
);

module.exports = passport;
