const express = require("express");
const port = 9000;
const app = express();

app.listen(port, function (err) {
  if (err) {
    console.log(`Error From Server: ${port}`);
    // this above is known as interpolation
    return;
  }
  console.log(`Server is up and running on port: ${port}`);
});
