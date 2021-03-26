const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 9000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");

// const MongoStore = require("connect-mongo")(session);
const MongoStore = require("connect-mongo").default;
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

// set up the chat server to be used with socket.io
const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(3000);
console.log("Chat server is listening on port 5000");

app.use(
  sassMiddleware({
    src: "./assets/scss", // where do i pickup the files to convett into scss
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));

// mongoStore is taking a session as an argument

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));

// make the uploads path available toe the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

// using express-ejs-layouts
app.use(expressLayouts);
// extract styles and scripts from subpages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// setting up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Setting up Express Sessions
// mongo store is used to store the session cookie
app.use(
  session({
    name: "getSocial",
    // TODO change the secret before deployment in production mode
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/getSocial_development",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

// telling the app to use passport
app.use(passport.initialize());
app.use(passport.session());

// whenever the app is getting initialized passport is also getting initialized then this function is called and when this functino is called it will check whether session cookie is present or not
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// use express router from routes folder index.
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error From Server: ${port}`);
    // this above is known as interpolation
    return;
  }
  console.log(`Server is up and running on port: ${port}`);
});
