import mongoose from "./index.js";

const baseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: false,
    },
    commander: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    logisticsOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    description: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const baseModel = mongoose.model("Base", baseSchema);

export default baseModel;
