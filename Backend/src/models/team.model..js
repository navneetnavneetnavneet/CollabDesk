const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "project" }],
  },
  { timestamps: true }
);

const teamModel = mongoose.model("team", teamSchema);

module.exports = teamModel;
