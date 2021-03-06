module.exports.setFlash = function (req, res, next) {
  // we are passing our flash as a response to access it in the template(layout.ejs);
  res.locals.flash = {
    success: req.flash("success"),
    error: req.flash("error"),
  };

  next();
};
