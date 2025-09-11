const {
  catchAsyncError,
} = require("../middlewares/catchAsyncError.middleware");
const { validationResult } = require("express-validator");
const ErrorHandler = require("../utils/ErrorHandler");
const projectModel = require("../models/project.model");
const teamModel = require("../models/team.model");
const userModel = require("../models/user.model");

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

module.exports.addMemberToProject = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { projectId } = req.params;
  const { userId } = req.body;

  const project = await projectModel.findById(projectId).populate("team");

  if (!project) {
    return next(new ErrorHandler("Project is not found !", 404));
  }

  const user = await userModel.findById(userId);

  if (!user) {
    return next(new ErrorHandler("User is not found !", 404));
  }

  if (!project.team.members.includes(user._id)) {
    return next(new ErrorHandler("User is not a part of the team !", 400));
  }

  if (project.members.includes(user._id)) {
    return next(new ErrorHandler("User already in project !", 400));
  }

  project.members.push(user._id);
  await project.save();

  res.status(200).json({
    message: "Member added to project",
    project,
  });
});

module.exports.deleteMemberFromProject = catchAsyncError(
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { projectId, userId } = req.params;

    const project = await projectModel.findById(projectId).populate("team");

    if (!project) {
      return next(new ErrorHandler("Project is not found !", 404));
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User is not found !", 404));
    }

    if (!project.members.includes(user._id)) {
      return next(
        new ErrorHandler("User is not a member of this project !", 400)
      );
    }

    const updatedProject = await projectModel
      .findByIdAndUpdate(
        projectId,
        { $pull: { members: userId } },
        { new: true }
      )
      .populate("members");

    res.status(200).json({
      message: "Member removed from project",
      project: updatedProject,
    });
  }
);

module.exports.updateProject = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { projectId } = req.params;
  const { name, description, status, deadline } = req.body;

  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) updateData.status = status;
  if (deadline !== undefined) updateData.deadline = deadline;

  const updatedProject = await projectModel.findByIdAndUpdate(
    projectId,
    updateData,
    { new: true, runValidators: true }
  );

  if (!updatedProject) {
    return next(new ErrorHandler("Project is not found!", 404));
  }

  res.status(200).json({
    message: "Project updated successfully",
    project: updatedProject,
  });
});

module.exports.deleteProject = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { projectId } = req.params;

  const project = await projectModel.findById(projectId);

  if (!project) {
    return next(new ErrorHandler("Project is not found !", 404));
  }

  if (project.team) {
    await teamModel.updateMany(
      { _id: { $in: project.team } },
      { $pull: { projects: projectId } }
    );
  }

  await projectModel.deleteOne({ _id: projectId });

  res.status(200).json({
    message: "Project deleted successfully",
  });
});
