const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth.middleware");
const projectController = require("../controllers/project.controller");
const { body, param } = require("express-validator");

router.post(
  "/create",
  authUser.isAuthenticated,
  authUser.checkRole("admin", "manager"),
  [
    body("name").notEmpty().withMessage("Project name is required"),
    body("description")
      .notEmpty()
      .withMessage("Project description is required"),
    body("deadline").notEmpty().withMessage("Project deadline is required !"),
    body("team").isMongoId().withMessage("Invalid teamId !"),
  ],
  projectController.createProject
);

router.get(
  "/my-projects",
  authUser.isAuthenticated,
  projectController.getProjectsByTeam
);

router.get(
  "/details/:projectId",
  authUser.isAuthenticated,
  param("projectId").isMongoId().withMessage("Invalid projectId !"),
  projectController.getProjectDetails
);

router.post(
  "/:projectId/add-member",
  authUser.isAuthenticated,
  authUser.checkRole("admin", "manager"),
  [
    param("projectId").isMongoId().withMessage("Invalid projectId !"),
    body("userId").isMongoId().withMessage("Invalid userId !"),
  ],
  projectController.addMemberToProject
);

router.delete(
  "/:projectId/remove-member/:userId",
  authUser.isAuthenticated,
  authUser.checkRole("admin", "manager"),
  [
    param("projectId").isMongoId().withMessage("Invalid projectId !"),
    param("userId").isMongoId().withMessage("Invalid userId !"),
  ],
  projectController.deleteMemberFromProject
);

router.put(
  "/update/:projectId",
  authUser.isAuthenticated,
  authUser.checkRole("admin", "manager"),
  [
    param("projectId").isMongoId().withMessage("Invalid projectId !"),
    body("name")
      .optional()
      .notEmpty()
      .withMessage("Project name cannot be empty"),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Project description cannot be empty"),
    body("status")
      .optional()
      .isIn(["not-started", "in-progress", "completed", "on-hold"])
      .withMessage(
        "Status must be one of (not-started, in-progress, completed, on-hold)"
      ),
    body("deadline").notEmpty().withMessage("Project deadline is required !"),
  ],
  projectController.updateProject
);

router.delete(
  "/delete/:projectId",
  authUser.isAuthenticated,
  authUser.checkRole("admin", "manager"),
  param("projectId").isMongoId().withMessage("Invalid projectId !"),
  projectController.deleteProject
);

module.exports = router;
