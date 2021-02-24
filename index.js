const express = require("express");
const cookieParser = require("cookie-parser");
const port = 9000;
const app = express();

const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));

// using express-ejs-layouts
app.use(expressLayouts);
// extract styles and scripts from subpages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

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
