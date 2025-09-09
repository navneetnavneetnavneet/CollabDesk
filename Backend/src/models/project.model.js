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
    team: { type: mongoose.Schema.Types.ObjectId, ref: "team" },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "task" }],
  },
  { timestamps: true }
);

const projectModel = mongoose.model("project", projectSchema);

module.exports = projectModel;
