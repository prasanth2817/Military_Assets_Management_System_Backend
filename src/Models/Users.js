import mongoose from "./index.js";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "BaseCommander", "LogisticsOfficer"],
      default: "BaseCommander",
      required: true,
    },
    base: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Base",
      required: function () {
        return this.role !== "Admin"; // Admins don’t belong to a particular base
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    Collection: "User",
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
