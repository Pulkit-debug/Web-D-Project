const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const env = require("./environment");

let transporter = nodemailer.createTransport(env.smtp);

// relative path is from where the mail is to be send.
let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("Error in rendering template", err);
        return;
      }

      mailHTML = template;
    }
    // mailers will carry all the html ejs template code
  );

  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
