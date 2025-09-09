const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const authUser = require("../middlewares/auth.middleware");
const teamController = require("../controllers/team.controller");

router.post(
  "/create",
  authUser.isAuthenticated,
  authUser.checkRole("admin", "manager"),
  [body("name").notEmpty().withMessage("Team name is required !")],
  teamController.createTeam
);

router.post(
  "/invite",
  authUser.isAuthenticated,
  authUser.checkRole("admin"),
  [
    body("teamId").isMongoId().withMessage("Inavlid teamId !"),
    body("email").isEmail().withMessage("Inavlid email !"),
  ],
  teamController.inviteMember
);

router.post(
  "/join",
  authUser.isAuthenticated,
  [body("token").notEmpty().withMessage("token is required !")],
  teamController.joinTeam
);

router.get(
  "/details/:teamId",
  param("teamId").isMongoId().withMessage("Invalid teamId !"),
  authUser.isAuthenticated,
  teamController.getTeamDetails
);

router.get("/my", authUser.isAuthenticated, teamController.getMyTeams);

module.exports = router;
