import express from "express";
import UserRoutes from "./Users.js";
import BaseRoutes from "./Bases.js";
import PurchaseRoutes from "./Purchase.js";

const router = express.Router();

router.use("/user", UserRoutes);
router.use("/base", BaseRoutes);
router.use("/purchase", PurchaseRoutes)

export default router;

