const nodemailer = require("../config/nodemailer");

// fucniton which will send the mail

// another way of exporting a method
exports.newComment = (comment) => {
  let htmlString = nodemailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment.ejs"
  );
  nodemailer.transporter.sendMail(
    {
      from: "getSocial.com",
      to: comment.user.email,
      subject: "New Comment Published",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }

      console.log("Message Sent Succesfully", info);
    }
  );
};
