const {
  catchAsyncError,
} = require("../middlewares/catchAsyncError.middleware");
const { validationResult } = require("express-validator");
const projectModel = require("../models/project.model");
const ErrorHandler = require("../utils/ErrorHandler");
const taskModel = require("../models/task.model");

module.exports.createTask = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const {
    title,
    description,
    status,
    project,
    assignee,
    deadline,
    attachments,
  } = req.body;

  const isProject = await projectModel.findById(project);

  if (!isProject) {
    return next(new ErrorHandler("Project is not found !", 404));
  }

  const task = await taskModel.create({
    title,
    description,
    status,
    project,
    assignee: assignee || null,
    deadline,
    attachments,
    createdBy: req.user._id,
  });

  isProject.tasks.push(task._id);
  await isProject.save();

  res.status(201).json({
    message: "Create task successfully",
    task,
  });
});

module.exports.getTaskDetails = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { taskId } = req.params;

  const task = await taskModel
    .findById(taskId)
    .populate("createdBy")
    .populate("project")
    .populate("assignee");

  if (!task) {
    return next(new ErrorHandler("Task is not found !", 404));
  }

  res.status(200).json(task);
});
