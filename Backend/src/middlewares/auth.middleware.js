const {
  catchAsyncError,
} = require("../middlewares/catchAsyncError.middleware");
const ErrorHandler = require("../utils/ErrorHandler");
const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ErrorHandler("Unauthorized User !", 401));
  }

  const isBlacklistedToken = await blacklistTokenModel.findOne({ token });

  if (isBlacklistedToken) {
    return next(new ErrorHandler("Unauthorized User !", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;

    next();
  } catch (error) {
    return next(new ErrorHandler("Unauthorized User !", 401));
  }
});
