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
    .populate({
      path: "project",
      populate: {
        path: "createdBy",
      },
    })
    .populate("assignee");

  if (!task) {
    return next(new ErrorHandler("Task is not found !", 404));
  }

  res.status(200).json(task);
});

// module.exports.getProjectTasks = catchAsyncError(async (req, res, next) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({ message: errors.array() });
//   }

//   const { projectId } = req.params;

//   const project = await projectModel.findById(projectId).populate({
//     path: "tasks",
//     populate: {
//       path: "createdBy",
//     },
//   });

//   if (!project) {
//     return res.next("Project is not found !", 404);
//   }

//   res.status(200).json(project);
// });

module.exports.getProjectTasks = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  
  const user = req.user;
  const { projectId } = req.params;

  const tasks = await taskModel
    .find({ project: projectId })
    .populate("createdBy")
    .populate("project")
    .populate("assignee");

  res.status(200).json(tasks);
});

module.exports.updateTask = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { taskId } = req.params;
  const { title, description, status, assignee, deadline, attachments } =
    req.body;

  const task = await taskModel.findById(taskId);

  if (!task) {
    return next(new ErrorHandler("Task is not found !", 404));
  }

  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) updateData.status = status;
  if (assignee !== undefined) updateData.assignee = assignee;
  if (deadline !== undefined) updateData.deadline = deadline;
  if (attachments !== undefined) updateData.attachments = attachments;

  const updatedTask = await taskModel.findByIdAndUpdate(taskId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedTask) {
    return next(new ErrorHandler("Task not found!", 404));
  }

  res.status(200).json({
    message: "Task updated successfully",
    task: updatedTask,
  });
});

module.exports.deleteTask = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { taskId } = req.params;

  const task = await taskModel.findById(taskId);

  if (!task) {
    return next(new ErrorHandler("Task is not found !", 404));
  }

  if (task.project) {
    await projectModel.updateMany(
      { _id: { $in: task.project } },
      { $pull: { tasks: taskId } }
    );
  }

  await taskModel.deleteOne({ _id: taskId });

  res.status(200).json({
    message: "Task deleted successfully",
  });
});
