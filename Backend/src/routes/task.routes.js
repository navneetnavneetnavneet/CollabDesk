const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
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

module.exports = router;
