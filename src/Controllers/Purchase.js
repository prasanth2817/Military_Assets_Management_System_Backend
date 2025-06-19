import PurchaseModel from "../Models/Purchase.js";
import UserModel from "../Models/Users.js";
import BaseModel from "../Models/Bases.js";

// Create Purchase
const createPurchase = async (req, res) => {
  try {
    const { itemName, category, quantity, cost, vendor, status, remarks } = req.body;
    const { baseId, userId } = req.params;

    const user = await UserModel.findById(userId);
    const base = await BaseModel.findById(baseId);

    if (!user || !base) {
      return res.status(404).json({ message: "User or Base not found" });
    }

    if (!(user.role === "LogisticsOfficer" || user.role === "Admin")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const purchase = await PurchaseModel.create({
      itemName,
      category,
      quantity,
      cost,
      vendor,
      status,
      base: base._id,
      purchasedBy: user._id,
      remarks,
    });

    res.status(201).json({ message: "Purchase created successfully", purchase });
  } catch (error) {
    console.error("Error creating purchase:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get All Purchases (Admin)
const getAllPurchases = async (req, res) => {
  try {
    const purchases = await PurchaseModel.find()
      .populate("base", "name code")
      .populate("purchasedBy", "userName role");
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get Purchases by Base
const getPurchasesByBase = async (req, res) => {
  try {
    const { baseId } = req.params;
    const purchases = await PurchaseModel.find({ base: baseId })
      .populate("purchasedBy", "userName role");
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get Purchases by User
const getPurchasesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const purchases = await PurchaseModel.find({ purchasedBy: userId })
      .populate("base", "name code");
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update Purchase Status
const updatePurchaseStatus = async (req, res) => {
  try {
    const { purchaseId } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected", "Delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedPurchase = await PurchaseModel.findByIdAndUpdate(
      purchaseId,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.status(200).json({ message: "Purchase status updated", updatedPurchase });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete Purchase
const deletePurchase = async (req, res) => {
  try {
    const { purchaseId } = req.params;
    const purchase = await PurchaseModel.findByIdAndDelete(purchaseId);

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.status(200).json({ message: "Purchase deleted", purchase });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default {
  createPurchase,
  getAllPurchases,
  getPurchasesByBase,
  getPurchasesByUser,
  updatePurchaseStatus,
  deletePurchase,
};
