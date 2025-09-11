const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const authUser = require("../middlewares/auth.middleware");
const taskController = require("../controllers/task.controller");

router.post(
  "/create",
  authUser.isAuthenticated,
  authUser.checkRole("admin", "manager"),
  [
    body("title").notEmpty().withMessage("Task title is required !"),
    body("description")
      .notEmpty()
      .withMessage("Task description is required !"),
    body("status")
      .isIn(["todo", "in-progress", "done"])
      .withMessage("Status must be one of (todo, in-progress, done)"),
    body("project").isMongoId().withMessage("Project Id is required !"),
  ],
  taskController.createTask
);

router.get(
  "/details/:taskId",
  authUser.isAuthenticated,
  param("taskId").isMongoId().withMessage("Invalid taskId !"),
  taskController.getTaskDetails
);

router.get(
  "/:projectId",
  authUser.isAuthenticated,
  param("projectId").isMongoId().withMessage("Invalid projectId !"),
  taskController.getProjectTasks
);

router.put(
  "/update/:taskId",
  authUser.isAuthenticated,
  authUser.checkRole("admin", "manager"),
  param("taskId").isMongoId().withMessage("Invalid taskId !"),
  taskController.updateTask
);

router.delete(
  "/delete/:taskId",
  authUser.isAuthenticated,
  authUser.checkRole("admin", "manager"),
  param("taskId").isMongoId().withMessage("Invalid taskId !"),
  taskController.deleteTask
);

module.exports = router;
