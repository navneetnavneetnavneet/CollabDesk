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
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "project" },
    deadline: {
      type: Date,
    },
    attachments: [
      {
        fileName: String,
        fileUrl: String,
        fileType: String,
      },
    ],
  },
  { timestamps: true }
);

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;
