const {
  catchAsyncError,
} = require("../middlewares/catchAsyncError.middleware");
const { validationResult } = require("express-validator");
const ErrorHandler = require("../utils/ErrorHandler");
const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const { sendOTP } = require("../services/nodemailer.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.verifyEmail = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email } = req.body;

  const user = await userModel.findOne({ email });

  if (user?.isVerified) {
    return next(new ErrorHandler("User already existed, Please login !", 400));
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpirationTime = Date.now() + 10 * 60 * 1000;
  const salt = await bcrypt.genSalt(10);
  const hashedOtp = await bcrypt.hash(otp, salt);

  await userModel.findOneAndUpdate(
    { email },
    { otp: hashedOtp, otpExpiration: otpExpirationTime },
    { upsert: true }
  );

  try {
    sendOTP(email, "Your OTP Code", `Your OTP Code is ${otp}`);
    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    return next(new ErrorHandler("Email sending error !", 500));
  }
});

module.exports.registerUser = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { fullName, email, password, role, otp } = req.body;

  let user = await userModel.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User is not found !", 404));
  }

  if (user.isVerified) {
    return next(
      new ErrorHandler(
        "User already verified and registered, Please login !",
        400
      )
    );
  }

  const isValidOtp = await bcrypt.compare(otp, user.otp);

  if (!isValidOtp || user.otpExpiration < new Date()) {
    return next(new ErrorHandler("Invalid or expire OTP !", 400));
  }

  user.fullName = fullName;
  user.password = password;
  user.role = role;
  user.isVerified = true;
  user.otp = null;
  user.otpExpiration = null;

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.cookie("token", token);

  await user.save();

  res.status(201).json({
    message: "User register successfully",
    user,
  });
});

module.exports.loginUser = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password !", 401));
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    return next(new ErrorHandler("Invalid email or password !", 401));
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "User login successfully",
    user,
  });
});

module.exports.logoutUser = catchAsyncError(async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  res.clearCookie("token");

  await blacklistTokenModel.create({ token });

  res.status(200).json({
    message: "User logout successfully",
  });
});
