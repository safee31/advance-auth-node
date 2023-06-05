const { customError } = require("../Helpers/customError");
const { verifyJwt } = require("../Helpers/jwt");

exports.protect = async (req, res, next) => {
  const auth = req.headers["authorization"];
  console.log(req.cookies);
  let token;

  if (auth && auth.startsWith("Bearer")) {
    token = auth.split(" ")[1];
  }
  if (!token) return next(customError("Authantication Failed!", 401));

  try {
    const user = await verifyJwt(token);
    if (!user) {
      next(customError("Authantication Failed No User Found!", 401));
    }
    req.user = { _id: user._id };
    next();
  } catch (error) {
    next(error);
  }
};

exports.protectByCookie = async (req, res, next) => {
  const auth = req.cookies;
  let token;

  if (auth) {
    token = auth.testToken;
  }
  if (!token) return next(customError("Authantication Failed!", 401));

  try {
    const user = await verifyJwt(token);
    if (!user) {
      next(customError("Authantication Failed No User Found!", 401));
    }
    req.user = { _id: user._id };
    next();
  } catch (error) {
    next(error);
  }
};
