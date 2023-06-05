const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../Config");

const secret = JWT_SECRET;

const userScheme = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "firstName required!"] },
    lastName: { type: String, required: [true, "lastName required!"] },
    userName: { type: String, required: [true, "userName required!"] },
    image: { type: String, required: [true, "image required!"] },
    email: {
      type: String,
      required: [true, "email required!"],
      unique: true,
      // match: [/^[w-.]+@([w-]+.)+[w-]{2,}$/, "provide valid email"],
    },
    password: {
      type: String,
      required: [true, "password required!"],
      minlength: 6,
      select: false,
    },
    role: { type: String, default: "" },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userScheme.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(11);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userScheme.methods.matchpswd = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userScheme.methods.getSigned = function () {
  let payload = { userId: this._id };
  return jwt.sign(payload, secret, { expiresIn: 120 });
};

const User = mongoose.model("User", userScheme);
module.exports = User;
