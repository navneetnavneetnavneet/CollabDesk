const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      trim: true,
    },
    token: {
      type: String,
      require: true,
      unique: true,
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    expiresAt: {
      type: Date,
      default: Date.now,
      expires: 86400,
    },
  },
  { timestamps: true }
);

const inviteModel = mongoose.model("invite", inviteSchema);

module.exports = inviteModel;
