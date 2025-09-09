const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
      trim: true,
      minLength: [6, "Password must be have atleast 6 characters !"],
      maxLength: [
        15,
        "Password should not be exceed more than 15 characters !",
      ],
    },
    role: {
      type: String,
      enum: ["admin", "manager", "member"],
      default: "member",
    },
    profileImage: {
      type: Object,
      default: {
        fileId: "",
        url: "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg",
        fileType: "",
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      minLength: [6, "OTP must be 6 characters !"],
    },
    otpExpiration: {
      type: String,
    },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "team" }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
