const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "project" },
    deadline: {
      type: Date,
    },
    attachments: [],
  },
  { timestamps: true }
);

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;
