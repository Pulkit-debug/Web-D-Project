const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/getSocial_development");

const db = mongoose.connection;

db.on("err", console.error.bind(console, "Error Connecting to Mongodb"));

db.once("open", function () {
  console.log("Connected to DataBase MongoDb");
});

module.exports = db;
