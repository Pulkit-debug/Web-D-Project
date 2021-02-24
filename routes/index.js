const express = require("express");

const router = express.Router();
//getting home controller
const homeController = require("../controllers/home_controller");

// console.log("router working");

router.get("/", homeController.home);

module.exports = router;
// so that main index.js can read it.
