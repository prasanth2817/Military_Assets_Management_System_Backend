import express from "express";
import BaseController from "../Controllers/Bases.js";
import Auth from "../Common/Auth.js";

const router = express.Router();

router.post(
  "/create",
  Auth.validate,
  Auth.verifyRole(["Admin"]),
  BaseController.createBase
);
router.put(
  "/assign-commander/:baseId",
  Auth.validate,
  Auth.verifyRole(["Admin"]),
  BaseController.assignCommanderToBase
);
router.put(
  "/edit/:baseId",
  Auth.validate,
  Auth.verifyRole(["Admin"]),
  BaseController.editBase
);
router.delete(
  "/delete/:baseId",
  Auth.validate,
  Auth.verifyRole(["Admin"]),
  BaseController.deleteBase
);

export default router;
