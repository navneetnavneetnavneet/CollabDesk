const { validationResult } = require("express-validator");
const {
  catchAsyncError,
} = require("../middlewares/catchAsyncError.middleware");
const teamModel = require("../models/team.model");
const userModel = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../services/nodemailer.service");
const inviteModel = require("../models/invite.model");

module.exports.createTeam = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { name } = req.body;

  const isTeam = await teamModel.findOne({ name });

  const user = await userModel.findById(req.user._id);

  if (isTeam) {
    return next(new ErrorHandler("Team already present with this name !", 400));
  }

  try {
    const team = await teamModel.create({
      name,
      members: [user._id],
    });

    user.teams.push(team._id);
    await user.save();

    res.status(201).json({
      message: "Team is created successfully",
      team,
    });
  } catch (error) {
    return next(new ErrorHandler("Team is not created !", 500));
  }
});

module.exports.inviteMember = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { teamId, email } = req.body;

  const team = await teamModel.findById(teamId);

  if (!team) {
    return next(new ErrorHandler("Team is not found !", 404));
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User is not found !", 404));
  }

  if (!team.members.includes(req.user._id)) {
    return next(new ErrorHandler("You are not a member of this team!", 403));
  }

  if (!["admin", "manager"].includes(req.user.role)) {
    return next(new ErrorHandler("Only admin or manager can invite!", 403));
  }

  const token = uuidv4();

  const invitationLink = `${req.protocol}://${req.get(
    "host"
  )}/api/team/join/${token}`;

  sendEmail(
    user.email,
    "Team Invitation Link",
    `Your link is ${invitationLink}`
  );

  const invite = await inviteModel.create({
    team: team._id,
    email: user.email,
    token: token,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: `Invitation sent to ${user.email}`,
    invitationLink,
    invite,
  });
});

module.exports.joinTeam = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { token } = req.body;

  const user = await userModel.findById(req.user._id);

  const invite = await inviteModel.findOne({ token });

  if (!invite) {
    return next(new ErrorHandler("Invalid or expired invite !", 400));
  }

  if (invite.expiresAt < Date.now()) {
    await inviteModel.deleteOne({ token });
    return next(new ErrorHandler("Invite expired!", 400));
  }

  if (invite.email !== user.email) {
    return next(new ErrorHandler("This invite is not for you !", 400));
  }

  const team = await teamModel.findById(invite.team);

  if (!team) {
    return next(new ErrorHandler("Team is not found !", 404));
  }

  if (team.members.includes(user._id)) {
    return next(new ErrorHandler("User already a member of this team !", 400));
  }

  team.members.push(user._id);
  user.teams.push(team._id);

  Promise.all([await team.save(), await user.save()]);

  await inviteModel.deleteOne({ token });

  res.status(200).json({
    message: "User successfully joined",
    team,
  });
});

module.exports.getTeamDetails = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { teamId } = req.params;

  const team = await teamModel.findById(teamId);

  if (!team) {
    return next(new ErrorHandler("Team is not found !", 404));
  }

  res.status(200).json(team);
});

module.exports.getMyTeams = catchAsyncError(async (req, res, next) => {
  const teams = await teamModel
    .find({
      members: { $eq: { _id: req.user._id } },
    })
    .populate("members");

  res.status(200).json(teams);
});

module.exports.deleteMemberFromTeam = catchAsyncError(
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { teamId, userId } = req.params;

    const team = await teamModel.findById(teamId);

    if (!team) {
      return next(new ErrorHandler("Team is not found !", 404));
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User is not found !", 404));
    }

    if (!team.members.includes(user._id)) {
      return next(new ErrorHandler("User is not a member of this team !", 400));
    }

    const updatedTeam = await teamModel.findByIdAndUpdate(
      teamId,
      { $pull: { members: userId } },
      { new: true }
    );

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $pull: { teams: teamId } },
      { new: true }
    );

    res.status(204).json({
      message: "User removed successfully from team",
      team: updatedTeam,
      user: updatedUser,
    });
  }
);

module.exports.deleteTeam = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { teamId } = req.params;

  const team = await teamModel.findById(teamId);

  if (!team) {
    return next(new ErrorHandler("Team is not found !", 404));
  }

  await userModel.updateMany(
    { _id: { $in: team.members } },
    { $pull: { teams: teamId } }
  );

  await teamModel.deleteOne({ _id: teamId });

  res.status(200).json({
    message: "Team is successfully delete",
    user,
  });
});

module.exports.leaveTeam = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { teamId } = req.params;
  const userId = req.user._id;

  const team = await teamModel.findById(teamId);

  if (!team) {
    return next(new ErrorHandler("Team is not found !", 404));
  }

  if (!team.members.includes(userId)) {
    return next(new ErrorHandler("You are not a member of this team !", 400));
  }

  const updatedTeam = await teamModel.findByIdAndUpdate(
    teamId,
    { $pull: { members: userId } },
    { new: true }
  );

  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { $pull: { teams: teamId } },
    { new: true }
  );

  if (updatedTeam.members.length === 0) {
    await teamModel.deleteOne({ _id: teamId });

    return res.status(200).json({
      message:
        "You left the team. Since no members remained, the team was deleted.",
      user: updatedUser,
    });
  }

  res.status(200).json({
    message: "You have successfully left the team",
    user: updatedUser,
    team: updatedTeam,
  });
});
