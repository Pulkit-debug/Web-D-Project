const express = require("express");
const port = 9000;
const app = express();

// use express router from routes folder index.
app.use("/", require("./routes/index"));

// setting up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Error From Server: ${port}`);
    // this above is known as interpolation
    return;
  }
  console.log(`Server is up and running on port: ${port}`);
});
