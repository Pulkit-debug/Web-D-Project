module.exports.home = function (req, res) {
  console.log(req.cookies);
  // res.cookie("cook", 234);
  return res.render("home", {
    title: "homePage",
  });
};
