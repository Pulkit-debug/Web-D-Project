const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

// sign in and create a session for the user.
module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid Username/Password",
      });
    }

    return res.json(200, {
      message: "Signed in Successfull! Go Ahead with your Token!",
      data: {
        token: jwt.sign(user.toJSON(), "getSocial", { expiresIn: "100000" }),
      },
    });
  } catch (err) {
    console.log("Error: ", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
