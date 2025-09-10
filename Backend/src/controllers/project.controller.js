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

  res.status(201).json({
    message: "Create project successfully",
    project,
  });
});
