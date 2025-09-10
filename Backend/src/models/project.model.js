const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["not-started", "in-progress", "completed", "on-hold"],
      default: "not-started",
    },
    deadline: {
      type: Date,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "team" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "task" }],
  },
  { timestamps: true }
);

const projectModel = mongoose.model("project", projectSchema);

module.exports = projectModel;
