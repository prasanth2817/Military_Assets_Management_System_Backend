import express from "express";
import UserRoutes from "./Users.js";

const router = express.Router();

router.use("/user", UserRoutes);

export default router;

