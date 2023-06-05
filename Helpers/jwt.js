const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../Config");
const User = require("../Models/user");

exports.signJwt = async (payload) => {
  if (!payload || !Object.keys(payload).length || !payload._id) {
    return "";
  }
  return payload.getSigned();
};

exports.verifyJwt = async (token) => {
  const payload = jwt.verify(token, JWT_SECRET);

  return await User.findById(payload.userId);
};
