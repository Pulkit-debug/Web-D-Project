const express = require("express");

const router = express.Router();
const posts_api_v2 = require("../../../controllers/api/v2/posts_api");

router.get("/", posts_api_v2.index);

module.exports = router;
