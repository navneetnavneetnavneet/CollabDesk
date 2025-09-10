const {
  catchAsyncError,
} = require("../middlewares/catchAsyncError.middleware");
const { validationResult } = require("express-validator");
const teamModel = require("../models/team.model");
const ErrorHandler = require("../utils/ErrorHandler");
const projectModel = require("../models/project.model");

module.exports.createProject = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { name, description, status, deadline, team, members } = req.body;

  const isTeam = await teamModel.findById(team);

  if (!isTeam) {
    return next(new ErrorHandler("Team is not found !", 404));
  }

  if (members && members.length > 0) {
    for (let userId of members) {
      if (!isTeam.members.includes(userId)) {
        return next(
          new ErrorHandler("One or more members are not part of the team!", 400)
        );
      }
    }
  }

  const project = await projectModel.create({
    name,
    description,
    status,
    deadline,
    team,
    members,
    createdBy: req.user._id,
  });

  isTeam.projects.push(project._id);
  await isTeam.save();

  res.status(201).json({
    message: "Create project successfully",
    project,
  });
});

module.exports.getProjectsByTeam = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { teamId } = req.params;
  const user = req.user;

  const team = await teamModel.findById(teamId);

  if (!team) {
    return next(new ErrorHandler("Team is not found !", 404));
  }

  const isTeamMember = team.members.includes(user._id);

  if (user.role !== "admin" && user.role !== "manager" && !isTeamMember) {
    return next(new ErrorHandler("Access denied !", 403));
  }

  const projects = await projectModel.find({ team: teamId }).populate({
    path: "team",
    populate: {
      path: "members",
    },
  });

  res.status(200).json(projects);
});

module.exports.getProjectDetails = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { projectId } = req.params;
  const user = req.user;

  const project = await projectModel
    .findById(projectId)
    .populate("createdBy")
    .populate("team")
    .populate("members")
    .populate("tasks");

  if (!project) {
    return next(new ErrorHandler("Project is not found !", 404));
  }

  const isTeamMember = project.team.members.includes(user._id);

  const isProjectMember = project.members.includes(user._id);

  if (
    user.role !== "admin" &&
    user.role !== "manager" &&
    !isTeamMember &&
    !isProjectMember
  ) {
    return next(new ErrorHandler("Access denied !", 403));
  }

  res.status(200).json(project);
});
