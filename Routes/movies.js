const express = require("express");
const { getMovies } = require("../Controllers/movies");
const { protect, protectByCookie } = require("../Middlewares/protectApi");

const router = express.Router();

router.get("/", protectByCookie, getMovies);

module.exports = router;
