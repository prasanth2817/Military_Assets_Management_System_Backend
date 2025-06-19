import express from "express";
import PurchaseController from "../Controllers/Purchase.js";
import Auth from "../Common/Auth.js";

const router = express.Router();

// Create Purchase (Logistics Officer / Admin)
router.post(
  "/create/:baseId/:userId",
  Auth.validate,
  Auth.verifyRole(["LogisticsOfficer", "Admin"]),
  PurchaseController.createPurchase
);

// Get all purchases (Admin only)
router.get(
  "/",
  Auth.validate,
  Auth.verifyRole(["Admin"]),
  PurchaseController.getAllPurchases
);

// Get purchases by base (Commander / Admin)
router.get(
  "/base/:baseId",
  Auth.validate,
  Auth.verifyRole(["BaseCommander", "Admin"]),
  PurchaseController.getPurchasesByBase
);

// Get purchases by user (Logistics Officer)
router.get(
  "/user/:userId",
  Auth.validate,
  Auth.verifyRole(["LogisticsOfficer", "Admin"]),
  PurchaseController.getPurchasesByUser
);

// Update status (Admin / Commander)
router.put(
  "/status/:purchaseId",
  Auth.validate,
  Auth.verifyRole(["BaseCommander", "Admin"]),
  PurchaseController.updatePurchaseStatus
);

// Delete purchase (Admin only)
router.delete(
  "/:purchaseId",
  Auth.validate,
  Auth.verifyRole(["Admin"]),
  PurchaseController.deletePurchase
);

export default router;
