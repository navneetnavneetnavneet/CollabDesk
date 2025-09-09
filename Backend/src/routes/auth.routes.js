const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/auth.controller");
const authUser = require("../middlewares/auth.middleware");

router.post(
  "/verify-email",
  [body("email").isEmail().withMessage("Invalid email !")],
  authController.verifyEmail
);

router.post(
  "/register",
  [
    body("fullName").isObject().withMessage("Full name must be an object !"),
    body("fullName.firstName")
      .exists()
      .notEmpty()
      .withMessage("First name is required !"),
    body("fullName.lastName")
      .exists()
      .notEmpty()
      .withMessage("Last name is required !"),
    body("email").isEmail().withMessage("Invalid email !"),
    body("password")
      .isLength({ min: 6, max: 15 })
      .withMessage("Password must be between 6 and 15 characters !"),
    body("role")
      .isIn(["admin", "manager", "member"])
      .withMessage("Role must be eigther (admin, manager, member)"),
    body("otp").isLength({ min: 6 }).withMessage("OTP must be 6 characters !"),
  ],
  authController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email !"),
    body("password")
      .isLength({ min: 6, max: 15 })
      .withMessage("Password must be between 6 and 15 characters !"),
  ],
  authController.loginUser
);

router.get("/logout", authUser.isAuthenticated, authController.logoutUser);

router.get("/user", authUser.isAuthenticated, authController.loggedInUser);

module.exports = router;
