const asyncHandler = require("../Helpers/asyncHandler");
const { customError } = require("../Helpers/customError");
const { signJwt } = require("../Helpers/jwt");
const User = require("../Models/user");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { userName, firstName, lastName, email, password, image } = req.body;

  const user = await User.create({
    userName,
    firstName,
    lastName,
    image,
    password,
    email,
  });

  const token = await signJwt(user);

  if (!token) {
    return next(customError("Generate Token Failed!", 400));
  }
  res.cookie("testToken", token, {
    maxAge: 1000 * 180,
    httpOnly: true,
  });
  res.status(201).json({ user });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchpswd(password))) {
    return next(customError("Incorrect Email or Password!", 401));
  }

  const token = await signJwt(user);

  if (!token) {
    return next(customError("Generate Token Failed!", 400));
  }
  res.cookie("testToken", token, {
    maxAge: 1000 * 180,
    httpOnly: true,
  });
  res.status(200).json({ user });
});

exports.readUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const validUser = await User.findById(_id);

  if (!validUser) {
    return next(customError("User Not Found!", 404));
  }
  return res.status(200).json(validUser);
});

exports.logOut = asyncHandler(async (req, res) => {
  const { cookieName } = req.body;
  res.clearCookie(cookieName, { httpOnly: true });
  return res.status(200).json("Logout Successfully!");
});

exports.verifyEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (await User.exists({ email })) {
    return next(customError("User already exist with given email!", 400));
  }

  res.status(200).json("Verified Successfully!");
});
