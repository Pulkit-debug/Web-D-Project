const express = require("express");

const router = express.Router();
//getting home controller
const homeController = require("../controllers/home_controller");

// console.log("router working");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));

// to create any more routes
// router.get("/routerName", require("./routerpath"));

module.exports = router;
// so that main index.js can read it.
