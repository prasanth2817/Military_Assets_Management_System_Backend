import express from "express";
import UserRoutes from "./Users.js";
import BaseRoutes from "./Bases.js";

const router = express.Router();

router.use("/user", UserRoutes);
router.use("/base", BaseRoutes);

export default router;

