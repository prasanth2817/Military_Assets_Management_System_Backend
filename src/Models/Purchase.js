import mongoose from "./index.js";

const purchaseSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    cost: { type: Number, required: true },
    vendor: {
    type: String,
    required: false
  },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Delivered"],
      default: "Pending",
    },
    base: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Base",
      required: true,
    },
    purchasedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const PurchaseModel = mongoose.model("Purchase", purchaseSchema);

export default PurchaseModel;
