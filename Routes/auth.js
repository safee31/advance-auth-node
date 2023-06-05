const express = require("express");
const {
  registerUser,
  loginUser,
  readUser,
  logOut,
  verifyEmail,
} = require("../Controllers/auth");
const { protectByCookie } = require("../Middlewares/protectApi");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verifyMail", verifyEmail);
router.post("/logout", logOut);
router.get("/user", protectByCookie, readUser);

module.exports = router;
